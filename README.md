Reproduces an issue between Closure Compiler and `lit-element`

Running `bazelisk build //:example-bundle` should yield a JS bundle, but instead errors with:

```
(12:00:16) INFO: Current date is 2020-11-18
(12:00:16) INFO: Analyzed target //cookies/partners/frontend/module/retail:retail-bundle (1 packages loaded, 2 targets configured).
(12:00:16) INFO: Found 1 target...
(12:00:19) ERROR: /Volumes/KICKSTART/platform/cookies/partners/frontend/module/retail/BUILD.bazel:34:24: Action cookies/partners/frontend/module/retail/retail-bundle.js failed (Exit 2): google-closure-compiler.sh failed: error executing command 
  (cd /private/var/tmp/_bazel_sam.g/7d21591e21e9004093815fedce36da59/execroot/BRICKTOP && \
  exec env - \
    BAZEL_NODE_MODULES_ROOT=npm/node_modules \
    COMPILATION_MODE=dbg \
  bazel-out/host/bin/external/npm/google-closure-compiler/bin/google-closure-compiler.sh '--platform=native' '--isolation_mode=IIFE' '--compilation_level=ADVANCED' '--dependency_mode=PRUNE_LEGACY' '--process_common_js_modules=true' '--module_resolution=NODE' '--env=BROWSER' '--language_in=STABLE' '--language_out=STABLE' '--use_types_for_optimization=true' '--js=node_modules/lit-element/package.json' '--js=node_modules/lit-element/lit-element.js' '--js=node_modules/lit-element/lib/*.js' '--js=node_modules/lit-html/package.json' '--js=node_modules/lit-html/lit-html.js' '--js=node_modules/lit-html/lib/*.js' '--js=cookies/partners/frontend/module/retail/retail-charts.js' '--entry_point=cookies/partners/frontend/module/retail/retail-charts.js' '--js_output_file=bazel-out/darwin-dbg/bin/cookies/partners/frontend/module/retail/retail-bundle.js' --debug '--bazel_node_modules_manifest=bazel-out/darwin-dbg/bin/cookies/partners/frontend/module/retail/_retail-bundle.module_mappings.json' --nobazel_patch_module_resolver)
Execution platform: @local_config_platform//:host
(node:7201) ExperimentalWarning: The fs.promises API is experimental
node_modules/lit-element/lib/updating-element.js:118: 
Originally at:
node_modules/lit-element/src/lib/updating-element.ts:278: ERROR - variable JSCompiler_renameProperty is undeclared
            JSCompiler_renameProperty('_classProperties', this))) {
            ^^^^^^^^^^^^^^^^^^^^^^^^^

node_modules/lit-html/lib/template-result.js:28: 
Originally at:
node_modules/lit-html/src/lib/template-result.ts:33: ERROR - variable trustedTypes is undeclared
    trustedTypes!.createPolicy('lit-html', {createHTML: (s) => s});
    ^^^^^^^^^^^^

2 error(s), 0 warning(s)
Target //cookies/partners/frontend/module/retail:retail-bundle failed to build
(12:00:19) INFO: Elapsed time: 2.972s, Critical Path: 2.40s
(12:00:19) INFO: 2 processes: 2 internal.
(12:00:19) FAILED: Build did NOT complete successfully
```

See `BUILD.bazel` for flags involved in compiler invocation (also see below):
```skylark
google_closure_compiler(
    name = "example-bundle",
    outs = ["example-bundle.js"],
    args = [
        "--platform=native",
        "--isolation_mode=IIFE",
        "--compilation_level=ADVANCED",
        "--dependency_mode=PRUNE_LEGACY",
        "--process_common_js_modules=true",
        "--module_resolution=NODE",
        "--env=BROWSER",
        "--language_in=STABLE",
        "--language_out=STABLE",
        "--use_types_for_optimization=true",
        "--js=node_modules/lit-element/package.json",
        "--js=node_modules/lit-element/lit-element.js",
        "--js=node_modules/lit-element/lib/*.js",
        "--js=node_modules/lit-html/package.json",
        "--js=node_modules/lit-html/lit-html.js",
        "--js=node_modules/lit-html/lib/*.js",
        "--js=$(execpath example-element.js)",
        "--entry_point=$(execpath example-element.js)",
        "--js_output_file=$@",
        "--debug",
    ],
    data = [
        "example-element.js",
        "@npm//lit-element:lit-element",
    ],
)
```

