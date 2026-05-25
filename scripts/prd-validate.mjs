#!/usr/bin/env node
/**
 * PRD spec 校验
 *
 * 用法:
 *   node scripts/prd-validate.mjs products/my-app/spec/auth.yaml
 *   node scripts/prd-validate.mjs products/my-app/spec/auth.yaml --freeze
 *   node scripts/prd-validate.mjs --product products/my-app --feature auth --freeze
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { parse as parseYaml } from "yaml";

const FREEZE = process.argv.includes("--freeze");

function usage() {
  console.error(`
用法:
  node scripts/prd-validate.mjs <path-to-spec.yaml> [--freeze]
  node scripts/prd-validate.mjs --product <product-dir> --feature <id> [--freeze]

--freeze  冻结前严格校验（验收、非目标、changelog 等）
`);
  process.exit(1);
}

function resolveSpecPath(argv) {
  const productIdx = argv.indexOf("--product");
  const featureIdx = argv.indexOf("--feature");
  if (productIdx !== -1 && featureIdx !== -1) {
    const productDir = argv[productIdx + 1];
    const featureId = argv[featureIdx + 1];
    if (!productDir || !featureId) usage();
    return resolve(productDir, "spec", `${featureId}.yaml`);
  }
  const positional = argv.filter((a) => !a.startsWith("-"));
  const file = positional.find((a) => a.endsWith(".yaml") || a.endsWith(".yml"));
  if (!file) usage();
  return resolve(file);
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function isNonEmptyArray(v) {
  return Array.isArray(v) && v.length > 0;
}

function validateSpec(doc, { freeze, filePath }) {
  const errors = [];
  const warnings = [];

  const req = (cond, msg) => {
    if (!cond) errors.push(msg);
  };

  req(isNonEmptyString(doc?.id), "缺少 id");
  req(isNonEmptyString(doc?.name), "缺少 name");
  req(isNonEmptyString(doc?.product), "缺少 product");
  req(isNonEmptyString(doc?.version), "缺少 version");
  req(doc?.status === "draft" || doc?.status === "frozen", "status 必须是 draft 或 frozen");

  req(isNonEmptyString(doc?.problem?.summary), "缺少 problem.summary");
  req(isNonEmptyArray(doc?.problem?.users), "缺少 problem.users（至少 1 项）");

  req(isNonEmptyArray(doc?.scope?.in), "缺少 scope.in（至少 1 项）");
  req(isNonEmptyArray(doc?.scope?.out), "缺少 scope.out（至少 1 项，写清本期不做）");

  req(isNonEmptyArray(doc?.flows?.main), "缺少 flows.main（至少 1 步）");
  if (isNonEmptyArray(doc?.flows?.main)) {
    doc.flows.main.forEach((step, i) => {
      req(isNonEmptyString(step?.step), `flows.main[${i}] 缺少 step`);
    });
  }

  req(isNonEmptyArray(doc?.entities), "缺少 entities（至少 1 个）");
  if (isNonEmptyArray(doc?.entities)) {
    doc.entities.forEach((ent, i) => {
      req(isNonEmptyString(ent?.name), `entities[${i}] 缺少 name`);
      req(isNonEmptyArray(ent?.fields), `entities[${i}] 缺少 fields`);
    });
  }

  req(isNonEmptyArray(doc?.rules), "缺少 rules（至少 1 条）");
  req(isNonEmptyArray(doc?.acceptance), "缺少 acceptance（至少 1 条）");
  if (isNonEmptyArray(doc?.acceptance)) {
    doc.acceptance.forEach((ac, i) => {
      req(isNonEmptyString(ac?.id), `acceptance[${i}] 缺少 id`);
      req(isNonEmptyString(ac?.given), `acceptance[${i}] 缺少 given`);
      req(isNonEmptyString(ac?.when), `acceptance[${i}] 缺少 when`);
      req(isNonEmptyString(ac?.then), `acceptance[${i}] 缺少 then`);
    });
  }

  req(isNonEmptyArray(doc?.non_goals), "缺少 non_goals（至少 1 项）");
  req(isNonEmptyArray(doc?.changelog), "缺少 changelog");

  if (freeze) {
    req(doc?.status === "frozen", "冻结校验要求 status: frozen（先由 PRD freeze 更新）");
    if (isNonEmptyArray(doc?.open_questions)) {
      const open = doc.open_questions.filter(
        (q) => isNonEmptyString(q) && !String(q).trim().startsWith("[resolved]")
      );
      if (open.length > 0) {
        errors.push(
          `仍有 ${open.length} 个未关闭的 open_questions，冻结前请解决或标记 [resolved]`
        );
      }
    }
    const version = doc?.version;
    if (!/^\d+\.\d+(\.\d+)?$/.test(String(version))) {
      warnings.push(`version 建议使用语义化小版本，当前: ${version}`);
    }
    if (!isNonEmptyArray(doc?.apis)) {
      warnings.push("apis 为空：若无 HTTP 接口可忽略；若有接口请在冻结前补全");
    }
  } else if (doc?.status === "frozen") {
    warnings.push("status 已是 frozen；若需修改请走 PRD change 并 bump 版本");
  }

  const fileName = filePath.split("/").pop()?.replace(/\.ya?ml$/, "");
  if (doc?.id && fileName && doc.id !== fileName) {
    warnings.push(`文件名为 ${fileName}.yaml 但 id 为 ${doc.id}，建议保持一致`);
  }

  return { errors, warnings, doc };
}

function main() {
  const argv = process.argv.slice(2);
  const specPath = resolveSpecPath(argv);
  if (!existsSync(specPath)) {
    console.error(`找不到 spec: ${specPath}`);
    process.exit(1);
  }

  let doc;
  try {
    doc = parseYaml(readFileSync(specPath, "utf8"));
  } catch (e) {
    console.error(`YAML 解析失败: ${e.message}`);
    process.exit(1);
  }

  const { errors, warnings, doc: spec } = validateSpec(doc, {
    freeze: FREEZE,
    filePath: specPath,
  });

  const label = FREEZE ? "FREEZE" : "DRAFT";
  console.log(`\n[prd-validate] ${label} — ${specPath}`);
  console.log(`  功能: ${spec?.name} (${spec?.id}) v${spec?.version} [${spec?.status}]\n`);

  if (warnings.length) {
    console.log("警告:");
    warnings.forEach((w) => console.log(`  ⚠ ${w}`));
    console.log("");
  }

  if (errors.length) {
    console.log("错误:");
    errors.forEach((e) => console.log(`  ✗ ${e}`));
    console.log(`\n共 ${errors.length} 项未通过。\n`);
    process.exit(1);
  }

  console.log("✓ 校验通过\n");
  process.exit(0);
}

main();
