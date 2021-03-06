// flow-typed signature: 54aab294e997a73532eec1a051cae3ed
// flow-typed version: <<STUB>>/lodash.throttle_v^4.1.1/flow_v0.80.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'lodash.throttle'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'lodash.throttle' {
  declare module.exports: <T>(
    fn: T,
    wait: ?number,
    options: { leading?: boolean, trailing?: boolean }
  ) => T;
}
