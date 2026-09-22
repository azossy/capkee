import{A as e,B as t,D as n,I as r,J as i,K as a,L as o,M as s,Q as c,T as l,U as u,Y as d,Z as f,a as p,ct as m,d as h,et as g,f as _,it as v,j as y,k as b,l as x,n as S,o as C,p as w,q as T,rt as ee,tt as te,u as ne,v as re,w as E,z as D}from"./index-client-CqffJhu4.js";import"./disclose-version-xihTtKlq.js";import{E as O,O as ie,o as k,r as A}from"./i18n.svelte-B8H7K9yl.js";import{n as j}from"./codes-C-5VGeMR.js";import{t as M}from"./NavIcon-B6JE7l8v.js";import{t as N}from"./route.svelte-C_LFMjho.js";import{a as ae,i as P,n as F,o as I,r as L,s as oe}from"./sdkShowcase-BXFYpey-.js";import{t as R}from"./PublicHeader-DfiNE3fA.js";import{t as z}from"./Card-Dywb_5uh.js";import{t as B}from"./Disclosure-DNBaUH7Q.js";import{r as se,t as ce}from"./developerSamples-1Hem7uAx.js";import{n as V,r as le}from"./format-4QiG0_bC.js";import{n as ue,t as de}from"./supportContact.generated-Da34jpiD.js";var H={schema:`capkee.sdk-documentation/1`,documentationStatus:`published`,sourceDigests:[{document:`API-REFERENCE.md`,sha256:`ab18374d58a07b37433928797a5547607cb0ea670bcf08244e0b5ece335a6f92`},{document:`SEMVER.md`,sha256:`2f7a610f351636551a095b60da8f76b1ae8657245e5ff196f06ae88eb9430af8`},{document:`CHANGELOG.md`,sha256:`9de8de3d07c265fd2d1993d66868a974c7c604e5a72a53c8646836d7a70fac29`},{document:`LICENSE-STATUS.md`,sha256:`5c5b95aaeefd651fe3ace9c029fbd63c340b9eef0e4bdc9530bd70b3d0eb9110`}],publicProseDigest:`a560cd69c4f487089a8ba51ad3cd5d468e76fc1987cea95423a63aa162ecd31f`,symbols:[{name:`ActiveLayerState`,kind:`interface`,blocks:[{kind:`text`,text:`Separates the currently selected layer from the configured default layer.`},{kind:`text`,text:`@remarks: SetActiveLayer is volatile; changing it does not commit the default. Bounds come from Hello.limits.layerCount.`},{kind:`code`,text:`const { activeLayer, defaultLayer } = await client.getActiveLayer();`},{kind:`code`,text:`interface ActiveLayerState {
    readonly activeLayer: number;
    readonly defaultLayer: number;
}`}]},{name:`CAPKEE_V1_SITE_INTEGRATION_STATE`,kind:`constant`,blocks:[{kind:`text`,text:`The SDK integration's lab-only release marker.`},{kind:`text`,text:`@remarks: It must not activate a public channel; production activation remains separately authorized and audited.`},{kind:`code`,text:`const state = CAPKEE_V1_SITE_INTEGRATION_STATE;`},{kind:`code`,text:`const CAPKEE_V1_SITE_INTEGRATION_STATE = 'LAB_ONLY_NOT_PRODUCTION_ACTIVE' as const`}]},{name:`CapkeeV1Client`,kind:`class`,blocks:[{kind:`text`,text:`High-level Device Protocol v1 client with bounded waits and correlated responses.`},{kind:`text`,text:`@remarks: Construct with an owned semantic transport, call Hello first, and read
the selected module's configuration before mutation. One session targets one
module at a time; callers serialize route changes with reads/transactions and
resubscribe after rebinding. Four-operation compatibility is learned from
canonical responses, never firmwareVersion. Subscription, routing and mutation
automatically negotiate advertised session ownership before dispatch. Pure
Hello/Get reads do not acquire ownership. Closing is not a device rollback.`},{kind:`text`,text:`@throws: DeviceSdkError for local guards, timeout, cancellation, malformed responses
or uncertain outcomes; DeviceRejectedError retains target domain/code/context.`},{kind:`code`,text:`const client = new CapkeeV1Client(transport);
try { await client.hello(); const keymap = await client.getKeymap(); }
finally { await client.close(); }`},{kind:`code`,text:`class CapkeeV1Client implements DeviceClient {
  constructor(transport: DeviceSemanticTransport, clientSessionId: ClientSessionId = createClientSessionId());
  hello(options?: DeviceCallOptions): Promise<HelloResponse>;
  enableSessionLifetime(options?: DeviceCallOptions): Promise<boolean>;
  getTopology(options?: DeviceCallOptions): Promise<TopologySnapshot>;
  subscribeEvents(listener: (event: DeviceEvent) => void, options?: DeviceCallOptions): Promise<DeviceSubscription>;
  getKeymap(options?: DeviceCallOptions): Promise<KeymapSnapshot>;
  getMacros(options?: DeviceCallOptions): Promise<MacroSnapshot>;
  getLighting(options?: DeviceCallOptions): Promise<LightingSnapshot>;
  getDiagnostics(options?: DeviceCallOptions): Promise<DiagnosticsSnapshot>;
  getActiveLayer(options?: DeviceCallOptions): Promise<ActiveLayerState>;
  setActiveLayer(layer: number, options?: DeviceCallOptions): Promise<Pick<ActiveLayerState, 'activeLayer'>>;
  routeSession(moduleId: ModuleId, options?: DeviceCallOptions): Promise<{ readonly moduleId: ModuleId }>;
  begin(resources: readonly DeviceChangeSet['resource'][], options?: DeviceCallOptions): Promise<DeviceTransaction>;
  factoryReset(reset: FactoryResetRequest, options?: DeviceCallOptions): Promise<VerificationResult>;
  getUpdateStatus(options?: DeviceCallOptions): Promise<UpdateStatus>;
  beginSignedUpdate(packageFile: SignedFirmwarePackage, options?: DeviceCallOptions): Promise<UpdateStatus>;
  close(): Promise<void>;
  maintainSessionLifetime(): Promise<void>;
}`},{kind:`heading`,text:"`constructor(transport: DeviceSemanticTransport, clientSessionId: ClientSessionId = createClientSessionId());`"},{kind:`text`,text:`Takes ownership of the transport; does not send Hello or open a device itself.`},{kind:`text`,text:`@param transport: - An owned semantic transport that close() will release.`},{kind:`text`,text:`@param clientSessionId: - Optional nonzero two-word correlation ID; default uses
Web Crypto. Use a fresh ID per new connection; it is not authentication.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_015) if the session ID is malformed.`},{kind:`heading`,text:"`hello(options?: DeviceCallOptions): Promise<HelloResponse>;`"},{kind:`text`,text:`Reads and validates identity, protocol, capabilities, limits and topology epoch.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Detached Hello response; initializes subsequent client operations.`},{kind:`text`,text:`@throws: SDK_004 for unsupported protocol, SDK_014 for changed identity, or coded read/response failure.`},{kind:`code`,text:`const hello = await client.hello();`},{kind:`heading`,text:"`enableSessionLifetime(options?: DeviceCallOptions): Promise<boolean>;`"},{kind:`text`,text:`Explicitly requests the same ownership negotiation automatically used before
routing, subscription or mutation. Repeated/concurrent calls share its result.`},{kind:`text`,text:`@returns: False on the unchanged legacy contract, true after an acknowledged lease.`},{kind:`text`,text:`@remarks: Diagnostic evidence, never firmwareVersion, selects this additive contract.
Hello/Get-only use remains read-only. Missing evidence preserves the legacy
contract; a failed negotiation never falls back to unmanaged resource use.
Normal close releases ownership; crash/sleep relies on the device deadline.
After expiry reconnect with a fresh session ID and read back uncertain writes.`},{kind:`code`,text:`await client.hello(); await client.enableSessionLifetime();`},{kind:`heading`,text:"`getTopology(options?: DeviceCallOptions): Promise<TopologySnapshot>;`"},{kind:`text`,text:`Reads complete or incomplete topology exactly as reported by the target.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Detached topology; callers must require complete before editing.`},{kind:`text`,text:`@throws: SDK_003 before Hello, SDK_009 for stale/ambiguous epoch, or coded read/response failure.`},{kind:`code`,text:`const topology = await client.getTopology();`},{kind:`heading`,text:"`subscribeEvents(listener: (event: DeviceEvent) => void, options?: DeviceCallOptions): Promise<DeviceSubscription>;`"},{kind:`text`,text:`Creates an independently received, generation-scoped event subscription.`},{kind:`text`,text:`@param listener: - Receives validated detached events; it must not block the receive path.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: A health/close handle. Recreate it after changing the selected module route.`},{kind:`text`,text:`@throws: Coded setup/acknowledgement failure; the acquired listener is cleaned up on invalid acknowledgement.`},{kind:`code`,text:`const subscription = await client.subscribeEvents(event => recordEvent(event));`},{kind:`heading`,text:"`getKeymap(options?: DeviceCallOptions): Promise<KeymapSnapshot>;`"},{kind:`text`,text:`Reads key assignments and revision for the currently selected module route.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: A detached device keymap snapshot; retain its nonzero revision for Stage.`},{kind:`text`,text:`@throws: SDK_003 before Hello, SDK_007 without capability, SDK_009 on topology drift, or coded read failure.`},{kind:`code`,text:`const before = await client.getKeymap();`},{kind:`heading`,text:"`getMacros(options?: DeviceCallOptions): Promise<MacroSnapshot>;`"},{kind:`text`,text:`Reads canonical macro slots and total-step bounds for the selected route.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: A detached device macro snapshot and nonzero configuration revision.`},{kind:`text`,text:`@throws: SDK_007 without Macro capability, SDK_006 for invalid limits/content, or coded read failure.`},{kind:`code`,text:`const before = await client.getMacros();`},{kind:`heading`,text:"`getLighting(options?: DeviceCallOptions): Promise<LightingSnapshot>;`"},{kind:`text`,text:`Reads the selected module's scene, topology epoch and nonzero revision.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: A detached scene observation, not a browser preview.`},{kind:`text`,text:`@throws: SDK_007 without Lighting capability, SDK_006 for invalid scene metadata, or coded read failure.`},{kind:`code`,text:`const before = await client.getLighting();`},{kind:`heading`,text:"`getDiagnostics(options?: DeviceCallOptions): Promise<DiagnosticsSnapshot>;`"},{kind:`text`,text:`Reads diagnostic counters and retains recovery-required evidence.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: A bounded diagnostics snapshot; no physical health verdict is inferred.`},{kind:`text`,text:`@throws: SDK_007 without capability or coded read failure. Recovery evidence independently blocks later mutation.`},{kind:`code`,text:`const diagnostics = await client.getDiagnostics();`},{kind:`heading`,text:"`getActiveLayer(options?: DeviceCallOptions): Promise<ActiveLayerState>;`"},{kind:`text`,text:`Reads volatile active and configured default layer state.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Validated layers within Hello.limits.layerCount.`},{kind:`text`,text:`@throws: SDK_007 without ActiveLayer capability, SDK_006 for invalid layer values, or coded read failure.`},{kind:`code`,text:`const layers = await client.getActiveLayer();`},{kind:`heading`,text:"`setActiveLayer(layer: number, options?: DeviceCallOptions): Promise<Pick<ActiveLayerState, 'activeLayer'>>;`"},{kind:`text`,text:`Selects a volatile layer without acquiring a configuration transaction or writing Flash.`},{kind:`text`,text:`@param layer: - Zero-based layer bounded by Hello.limits.layerCount.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: The acknowledged active layer, after equality validation.`},{kind:`text`,text:`@throws: SDK_015 for an invalid layer, SDK_007 without capability, or coded read/target failure.`},{kind:`code`,text:`await client.setActiveLayer(selectedLayer);`},{kind:`heading`,text:"`routeSession(moduleId: ModuleId, options?: DeviceCallOptions): Promise<{ readonly moduleId: ModuleId }>;`"},{kind:`text`,text:`Binds this client session to one module ID from GetTopology.`},{kind:`text`,text:`@param moduleId: - Exact eight-byte ID, including the root ID to return to root-local state.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Acknowledged module ID. Serialize routing with all reads/writes, then reread configuration and resubscribe.`},{kind:`text`,text:`@throws: DeviceRejectedError with Cfg/7 for unknown module or Cfg/8 for root-wide capacity; legacy targets can reject as Unsupported.`},{kind:`code`,text:`await client.routeSession(selectedModule.moduleId);`},{kind:`heading`,text:"`begin(resources: readonly DeviceChangeSet['resource'][], options?: DeviceCallOptions): Promise<DeviceTransaction>;`"},{kind:`text`,text:`Reserves configuration resources for a single topology-bound writer.`},{kind:`text`,text:`@param resources: - Nonempty unique supported Keymap/Macros/Lighting names.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: A transaction handle owned by this session; no staged data has been committed.`},{kind:`text`,text:`@throws: SDK_010 for overlapping mutation, SDK_016 for recovery, SDK_017 for prior uncertain outcome, or target rejection.`},{kind:`code`,text:`const transaction = await client.begin(['Lighting']);`},{kind:`heading`,text:"`factoryReset(reset: FactoryResetRequest, options?: DeviceCallOptions): Promise<VerificationResult>;`"},{kind:`text`,text:`Requests an explicitly authorized reset against the latest read configuration.`},{kind:`text`,text:`@param reset: - Exact device ID, current revision and target-issued physical confirmation token.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Verified reset evidence; callers must reread intended defaults and retain recovery data.`},{kind:`text`,text:`@throws: SDK_015 for invalid/stale authorization, SDK_007 without capability, or uncertainty/recovery/target failure.`},{kind:`code`,text:`const result = await client.factoryReset(resetRequest);`},{kind:`heading`,text:"`getUpdateStatus(options?: DeviceCallOptions): Promise<UpdateStatus>;`"},{kind:`text`,text:`Reads update progress and reconciles update-start uncertainty when evidence permits.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Validated target update status, not an activation permission.`},{kind:`text`,text:`@throws: SDK_007 without Update capability or coded read/response failure.`},{kind:`code`,text:`const status = await client.getUpdateStatus();`},{kind:`heading`,text:"`beginSignedUpdate(packageFile: SignedFirmwarePackage, options?: DeviceCallOptions): Promise<UpdateStatus>;`"},{kind:`text`,text:`Copies and preflights a signed package before requesting a capability-gated update.`},{kind:`text`,text:`@param packageFile: - Complete semantic package; target owns authentication and authorized ranges.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Validated target update progress.`},{kind:`text`,text:`@throws: SDK_011 for image digest mismatch, SDK_015 for package mismatch, SDK_007 without capability, or uncertainty/target failure.`},{kind:`code`,text:`const status = await client.beginSignedUpdate(packageFile);`},{kind:`heading`,text:"`close(): Promise<void>;`"},{kind:`text`,text:`Closes subscriptions, pending waits and the owned host transport.`},{kind:`text`,text:`@returns: The shared close-completion promise; repeated calls are idempotent.`},{kind:`text`,text:`@throws: DeviceSdkError if negotiated release or host transport cleanup fails.`},{kind:`text`,text:`@remarks: Negotiated close releases only this owner's volatile resources.
No rollback of a dispatched Commit or physical power cycle is implied.`},{kind:`code`,text:`await client.close();`},{kind:`heading`,text:"`maintainSessionLifetime(): Promise<void>;`"},{kind:`text`,text:`Services a negotiated lease from an external host wakeup (for example a
native tray clock). It does not assume hidden-webview timers keep running.`},{kind:`text`,text:`@returns: After any due bounded renewal; idle calls do not send a report.`},{kind:`text`,text:`@throws: SDK_012 when the lifetime was lost; reconnect with a fresh ID.`},{kind:`code`,text:`await client.maintainSessionLifetime();`}]},{name:`CapkeeV1Transaction`,kind:`class`,blocks:[{kind:`text`,text:`A topology-bound single-writer handle; obtain it from CapkeeV1Client.begin.`},{kind:`text`,text:`@remarks: Six-operation targets validate/verify remotely. Four-operation targets
use the response-driven compatibility shim; no firmware version is parsed.
After Commit dispatch, cancellation is not rollback: retain verificationRequired
and reconcile before any new write. Do not construct this class with custom hooks.`},{kind:`code`,text:`const transaction = await client.begin(['Lighting']);
await transaction.stage({ resource: 'Lighting', expectedRevision: before.configurationRevision, scene });
await transaction.validate();
await transaction.commit();
const verified = await transaction.verify();`},{kind:`code`,text:`class CapkeeV1Transaction implements DeviceTransaction {
  constructor(transactionId: TransactionId, topologyEpoch: number, resources: readonly DeviceChangeSet['resource'][], hooks: TransactionHooks);
  get transactionId(): TransactionId;
  get state(): TransactionState;
  get verificationRequired(): boolean;
  stage(change: DeviceChangeSet, options?: DeviceCallOptions): Promise<TransactionProgress>;
  validate(options?: DeviceCallOptions): Promise<TransactionProgress>;
  commit(options?: DeviceCallOptions): Promise<TransactionProgress>;
  verify(options?: DeviceCallOptions): Promise<VerificationResult>;
  abort(options?: DeviceCallOptions): Promise<TransactionProgress>;
}`},{kind:`heading`,text:"`constructor(transactionId: TransactionId, topologyEpoch: number, resources: readonly DeviceChangeSet['resource'][], hooks: TransactionHooks);`"},{kind:`text`,text:`Internal handle construction; consumers obtain this object from client.begin.`},{kind:`text`,text:`@param transactionId: - Device-issued nonzero transaction ID.`},{kind:`text`,text:`@param topologyEpoch: - Epoch captured by Begin.`},{kind:`text`,text:`@param resources: - Reserved resource names.`},{kind:`text`,text:`@param hooks: - Owning client's validation, dispatch and reconciliation hooks.`},{kind:`heading`,text:"`get transactionId(): TransactionId;`"},{kind:`text`,text:`Device-issued identity; not an authorization token.`},{kind:`heading`,text:"`get state(): TransactionState;`"},{kind:`text`,text:`Last observed state; local Validated on four-operation devices is not durable evidence.`},{kind:`heading`,text:"`get verificationRequired(): boolean;`"},{kind:`text`,text:`True after Commit dispatch until reconciliation; cancellation does not clear it.`},{kind:`heading`,text:"`stage(change: DeviceChangeSet, options?: DeviceCallOptions): Promise<TransactionProgress>;`"},{kind:`text`,text:`Copies and stages one reserved resource without claiming durable application.`},{kind:`text`,text:`@param change: - A resource with the selected module's nonzero device-read revision.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Progress at Staged.`},{kind:`text`,text:`@throws: SDK_008 for wrong state, SDK_009 for topology drift, SDK_015 for invalid input; target rejection retains device errors.`},{kind:`code`,text:`await transaction.stage(change);`},{kind:`heading`,text:"`validate(options?: DeviceCallOptions): Promise<TransactionProgress>;`"},{kind:`text`,text:`Validates staged work using the response-driven six/four-operation shim.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Validated progress; local only after an exact Unsupported response on four-operation devices.`},{kind:`text`,text:`@throws: SDK_008 for wrong state or a coded transport/target error. A local Validated result is not Flash evidence.`},{kind:`code`,text:`await transaction.validate();`},{kind:`heading`,text:"`commit(options?: DeviceCallOptions): Promise<TransactionProgress>;`"},{kind:`text`,text:`Dispatches a commit once and marks the outcome uncertain until verification.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Committed progress, optionally carrying four-operation durable evidence.`},{kind:`text`,text:`@throws: Coded SDK/target failure. After timeout or cancellation, do not Abort or repeat Commit; inspect verificationRequired and reconcile.`},{kind:`code`,text:`await transaction.commit();`},{kind:`heading`,text:"`verify(options?: DeviceCallOptions): Promise<VerificationResult>;`"},{kind:`text`,text:`Resolves commit uncertainty using the device generation's available evidence.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Verified evidence with nonzero revision and current epoch.`},{kind:`text`,text:`@throws: SDK_009 for changed topology (possibly after terminal reconciliation), SDK_008 for wrong state, or coded read/target failure.`},{kind:`code`,text:`const verified = await transaction.verify();`},{kind:`heading`,text:"`abort(options?: DeviceCallOptions): Promise<TransactionProgress>;`"},{kind:`text`,text:`Discards only a pre-commit transaction; never rolls back a dispatched commit.`},{kind:`text`,text:`@param options: - Bounded timeout and host-wait cancellation, not rollback.`},{kind:`text`,text:`@returns: Aborted progress on confirmed device acceptance.`},{kind:`text`,text:`@throws: SDK_008 after Commit dispatch or outside Begun/Staged/Validated; transport/target errors remain explicit.`},{kind:`code`,text:`if (!transaction.verificationRequired) await transaction.abort();`}]},{name:`deriveWorkspacePresentation`,kind:`function`,blocks:[{kind:`text`,text:`Produces the only model the v1 workspace UI should consume. Product names do
not select features; authoritative capabilities, topology and limits do.`},{kind:`text`,text:`@param snapshot: - A validated coherent snapshot from readWorkspaceDeviceSnapshot.`},{kind:`text`,text:`@returns: Detached presentation values without changing device coordinates.`},{kind:`text`,text:`@remarks: Pure projection, no I/O or generation detection. This is not an untrusted
input parser; invalid JavaScript caller shapes can throw runtime errors.`},{kind:`code`,text:`const presentation = deriveWorkspacePresentation(await readWorkspaceDeviceSnapshot(client));`},{kind:`code`,text:`function deriveWorkspacePresentation(snapshot: WorkspaceDeviceSnapshot): WorkspacePresentation`}]},{name:`DEVICE_CLIENT_OPERATION_METHODS`,kind:`constant`,blocks:[{kind:`text`,text:`Maps every Device Protocol operation to its high-level client or transaction method.`},{kind:`text`,text:`@remarks: The map includes legacy Validate/Verify; four-operation compatibility is response-driven, not a version-string branch.`},{kind:`code`,text:`DEVICE_CLIENT_OPERATION_METHODS.RouteSession // 'routeSession'`},{kind:`code`,text:`const DEVICE_CLIENT_OPERATION_METHODS = {
  Hello: 'hello',
  GetTopology: 'getTopology',
  SubscribeEvents: 'subscribeEvents',
  GetKeymap: 'getKeymap',
  GetMacros: 'getMacros',
  GetLighting: 'getLighting',
  GetDiagnostics: 'getDiagnostics',
  Begin: 'begin',
  Stage: 'stage',
  Validate: 'validate',
  Commit: 'commit',
  Verify: 'verify',
  FactoryReset: 'factoryReset',
  GetUpdateStatus: 'getUpdateStatus',
  BeginSignedUpdate: 'beginSignedUpdate',
  Abort: 'abort',
  GetActiveLayer: 'getActiveLayer',
  SetActiveLayer: 'setActiveLayer',
  RouteSession: 'routeSession',
  ControlSession: 'enableSessionLifetime',
  ControlRoutedSession: 'maintainSessionLifetime'
} as const satisfies Record<DeviceOperation, string>`}]},{name:`DEVICE_SDK_ERROR_CODES`,kind:`constant`,blocks:[{kind:`text`,text:`Stable SDK error identifiers; keep host errors separate from numeric target errors.`},{kind:`text`,text:`@remarks: Values are generation-independent. A timeout after a write is uncertainty, not a rollback.`},{kind:`code`,text:`error.code === DEVICE_SDK_ERROR_CODES.Timeout`},{kind:`code`,text:`const DEVICE_SDK_ERROR_CODES = {
  Timeout: 'SDK_001',
  Cancelled: 'SDK_002',
  NotInitialized: 'SDK_003',
  ProtocolVersionUnsupported: 'SDK_004',
  CorrelationMismatch: 'SDK_005',
  InvalidResponse: 'SDK_006',
  CapabilityUnsupported: 'SDK_007',
  TransactionState: 'SDK_008',
  TopologyChanged: 'SDK_009',
  Busy: 'SDK_010',
  IntegrityMismatch: 'SDK_011',
  TransportClosed: 'SDK_012',
  DeviceRejected: 'SDK_013',
  IdentityChanged: 'SDK_014',
  InvalidArgument: 'SDK_015',
  RecoveryRequired: 'SDK_016',
  MutationOutcomeUncertain: 'SDK_017'
} as const`}]},{name:`DEVICE_SDK_POLICY`,kind:`constant`,blocks:[{kind:`text`,text:`Host-side safety ceilings, bounded waits and subscription defaults.`},{kind:`text`,text:`@remarks: These are SDK guards, not measured device timing or product capacities.
Four-operation verify waits transactionEventDrainMs before bounded readback when
no correlated terminal event arrives. Hello supplies the served resource limits.`},{kind:`code`,text:`const timeoutMs = DEVICE_SDK_POLICY.defaultRequestTimeoutMs;`},{kind:`code`,text:`const DEVICE_SDK_POLICY = {
  minimumTimeoutMs: 1,
  defaultRequestTimeoutMs: 5_000,
  /**
   * Routed-session host model from the reviewed routed-session contract.
   * GetKeymap used one request + four response fragments in 56–68 ms, later
   * 71 ms and post-commit 86.030250 ms (PT-P15-04-s8img-relay log).
   * ceil(86.030250 / 5) = 18 ms rounds that sample upward. This is host margin,
   * not a wire timing promise. The target retries an unacknowledged relay
   * fragment after 20 ms, at most three times.
   */
  relayNominalFragmentBudgetMs: 18,
  relayAcknowledgementTimeoutMs: 20,
  relayMaximumRetransmissions: 3,
  /** Current 320 B GetDiagnostics response ceiling: ceil(320 / 24) = 14. */
  relayCurrentResponseByteCeiling: 320,
  /** Observed host recovery drain after abandoning a partial routed response. */
  relayTailDrainMs: 800,
  /** Independent event drain before revision readback; not a device timing claim. */
  transactionEventDrainMs: 250,
  /** TRANSACTION-RESULT-BODY-V1: Unsupported/Cfg/1, context = operation code. */
  unsupportedTransactionOperationCode: 1,
  defaultUpdateTimeoutMs: 120_000,
  maximumTimeoutMs: 300_000,
  maximumIdentifier: 0xffff_ffff,
  maximumErrorCode: 0xffff,
  maximumSemanticTextLength: 256,
  maximumSemanticCollectionLength: 65_536,
  maximumDiagnosticCounterCount: 512,
  maximumTopologyModuleCount: 256,
  maximumTopologyLinkCount: 255,
  maximumTopologyPortCount: 256,
  maximumTopologyRgbCount: 4_096,
  maximumBoardRevisionUtf8ByteLength: 64,
  maximumKeymapAssignmentCount: 4_096,
  maximumMacroSlotCount: 256,
  maximumMacroStepCount: 4_096,
  maximumReportedCapacity: 65_536,
  moduleIdByteLength: 8,
  maximumByteValue: 0xff,
  maximumOrientation: 3,
  minimumSignedInt32: -0x8000_0000,
  maximumSignedInt32: 0x7fff_ffff,
  topologySerialHalfRange: 0x8000_0000,
  sha256HexLength: 64,
  supportedUpdatePackageFormatVersion: 1,
  supportedSignatureFormatVersion: 2,
  supportedProductFamily: 'CAPKEE',
  maximumUpdateImageByteLength: 1_048_576,
  maximumUpdatePcbRevisionCount: 16,
  maximumUpdateSegmentCount: 64,
  signatureByteLength: 64,
  maximumPublicKeyIdLength: 64,
  maximumDeviceIdentityUtf8ByteLength: 1_024,
  minimumPhysicalConfirmationTokenLength: 8,
  maximumPhysicalConfirmationTokenLength: 128,
  workspaceSnapshotAttempts: 2,
  supportedProtocolMajor: 1,
  subscriptionHeartbeatIntervalMs: DEVICE_SUBSCRIPTION_BODY_POLICY.heartbeatIntervalMs,
  subscriptionUnhealthyAfterMs: DEVICE_SUBSCRIPTION_BODY_POLICY.unhealthyAfterMs,
  subscriptionEventQueueCapacity: DEVICE_SUBSCRIPTION_BODY_POLICY.eventQueueCapacity
} as const`}]},{name:`DeviceCallOptions`,kind:`interface`,blocks:[{kind:`text`,text:`Controls cancellation and the bounded wait for one SDK call.`},{kind:`text`,text:`@remarks: signal cancels the host wait, never rolls back a dispatched write. timeoutMs is the local per-request budget in milliseconds; after a session is routed to a child module, the SDK adds its bounded relay-fragment allowance across each datagram delivery attempt. verify uses the local value for its event window on four-operation devices.`},{kind:`code`,text:`const options: DeviceCallOptions = { signal: controller.signal };`},{kind:`code`,text:`interface DeviceCallOptions {
    /** Cancels the pending request wait; it does not roll back committed device state. */
    readonly signal?: AbortSignal;
    /** Local per-request limit; child routes add bounded relay time. Four-operation verify also uses the local value as its event window before bounded readback. */
    readonly timeoutMs?: number;
}`}]},{name:`DeviceChangeSet`,kind:`type`,blocks:[{kind:`text`,text:`Stages one reserved resource against its latest device-read revision.`},{kind:`text`,text:`@remarks: expectedRevision must be nonzero; reread after routing or reconnecting. Stage never proves durable application. Both transaction generations use this shape.`},{kind:`code`,text:`await transaction.stage({ resource: 'Lighting', expectedRevision: before.configurationRevision, scene });`},{kind:`code`,text:`type DeviceChangeSet = {
    readonly resource: 'Keymap';
    readonly expectedRevision: number;
    readonly assignments: readonly KeyAssignment[];
} | {
    readonly resource: 'Macros';
    readonly expectedRevision: number;
    readonly slots: readonly MacroSlot[];
} | {
    readonly resource: 'Lighting';
    readonly expectedRevision: number;
    readonly scene: LightingScene;
};`}]},{name:`DeviceClient`,kind:`interface`,blocks:[{kind:`text`,text:`High-level, capability-driven access to one Device Protocol client session.`},{kind:`text`,text:`@remarks: Hello initializes identity; read configuration before mutation. RouteSession binds one module at a time and shares a finite root-wide slot pool. Six/four-operation differences are hidden by DeviceTransaction's response-driven shim.`},{kind:`code`,text:`const hello = await client.hello();
const topology = await client.getTopology();`},{kind:`code`,text:`interface DeviceClient {
    /** Explicit facade for automatic ownership negotiation; absent on pre-lease SDK integrations. Pure reads do not acquire a lease. */
    enableSessionLifetime?(options?: DeviceCallOptions): Promise<boolean>;
    /** Native clocks may service a lease while hidden-webview timers are throttled. */
    maintainSessionLifetime?(): Promise<void>;
    hello(options?: DeviceCallOptions): Promise<HelloResponse>;
    getTopology(options?: DeviceCallOptions): Promise<TopologySnapshot>;
    subscribeEvents(listener: (event: DeviceEvent) => void, options?: DeviceCallOptions): Promise<DeviceSubscription>;
    getKeymap(options?: DeviceCallOptions): Promise<KeymapSnapshot>;
    getMacros(options?: DeviceCallOptions): Promise<MacroSnapshot>;
    getLighting(options?: DeviceCallOptions): Promise<LightingSnapshot>;
    getDiagnostics(options?: DeviceCallOptions): Promise<DiagnosticsSnapshot>;
    getActiveLayer(options?: DeviceCallOptions): Promise<ActiveLayerState>;
    /** Volatile RAM state; never acquires the configuration transaction or writes Flash. */
    setActiveLayer(layer: number, options?: DeviceCallOptions): Promise<Pick<ActiveLayerState, 'activeLayer'>>;
    /**
     * P15c: binds this client session to one module of the tree (a \`GetTopology\`
     * module id). Later requests of the session are relayed to that module by the
     * root; routing to the root's own id returns to local service.
     */
    routeSession(moduleId: ModuleId, options?: DeviceCallOptions): Promise<{
        readonly moduleId: ModuleId;
    }>;
    begin(resources: readonly DeviceChangeSet['resource'][], options?: DeviceCallOptions): Promise<DeviceTransaction>;
    factoryReset(request: FactoryResetRequest, options?: DeviceCallOptions): Promise<VerificationResult>;
    getUpdateStatus(options?: DeviceCallOptions): Promise<UpdateStatus>;
    beginSignedUpdate(packageFile: SignedFirmwarePackage, options?: DeviceCallOptions): Promise<UpdateStatus>;
    /** Closes subscriptions and the host transport without changing committed device state. */
    close(): Promise<void>;
}`}]},{name:`DeviceEvent`,kind:`type`,blocks:[{kind:`text`,text:`The discriminated stream of device events, independent of request responses.`},{kind:`text`,text:`@remarks: Listen continuously; events may follow their response. On TopologyChanged invalidate routes and uncommitted edits' device binding, not the user's draft. Missing events require readback, not fabricated success.`},{kind:`code`,text:`if (event.kind === 'PhysicalKey') recordEdge(event.address, event.pressed);`},{kind:`code`,text:`type DeviceEvent = {
    readonly kind: 'TopologyChanged';
    readonly epoch: TopologyEpoch;
} | {
    readonly kind: 'PhysicalKey';
    readonly address: PhysicalSwitchAddress;
    readonly pressed: boolean;
    readonly deviceTicks: number;
} | {
    readonly kind: 'TransactionStateChanged';
    readonly transactionId: TransactionId;
    readonly state: TransactionState;
} | {
    readonly kind: 'DiagnosticsChanged';
    readonly domain: DiagnosticsCounter['domain'];
    readonly code: number;
} | {
    readonly kind: 'UpdateStateChanged';
    readonly state: UpdateState;
} | {
    readonly kind: 'LayerChanged';
    readonly layer: number;
    readonly previousLayer: number;
    readonly deviceTicks: number;
} | {
    readonly kind: 'SubscriptionHeartbeat';
    readonly subscriptionGeneration: number;
    /** Serial32 sequence of this event within one subscription generation. */
    readonly eventSequence: number;
    /** Saturating count of events evicted before delivery in this generation. */
    readonly droppedEventCount: number;
};`}]},{name:`DeviceRejectedError`,kind:`class`,blocks:[{kind:`text`,text:`An SDK_013 failure containing detached target-domain error records.`},{kind:`text`,text:`@remarks: Inspect numericCode together with domain/context. Route errors 7 and 8 need topology reread/reselection and release of another session respectively.`},{kind:`code`,text:`if (error instanceof DeviceRejectedError) inspect(error.deviceErrors);`},{kind:`code`,text:`class DeviceRejectedError extends DeviceSdkError {
  deviceErrors: readonly DeviceError[];
  constructor(operation: DeviceOperation, deviceErrors: readonly DeviceError[]);
}`}]},{name:`DeviceSdkError`,kind:`class`,blocks:[{kind:`text`,text:`A coded host failure with operation, diagnostic context and suggested action.`},{kind:`text`,text:`@remarks: Same error model on both generations. SDK_017 preserves an uncertain mutation; reconnect and read before considering an explicit new write.`},{kind:`code`,text:`if (isDeviceSdkError(error)) showLocalizedError(error.code, error.userAction);`},{kind:`code`,text:`class DeviceSdkError extends Error {
  code: DeviceSdkErrorCode;
  userAction: DeviceSdkUserAction;
  operation: DeviceOperation | null;
  context: DeviceSdkErrorContext;
  constructor(code: DeviceSdkErrorCode, options: {
      readonly operation?: DeviceOperation;
      readonly context?: DeviceSdkErrorContext;
    } = {});
}`}]},{name:`DeviceSdkErrorCode`,kind:`type`,blocks:[{kind:`text`,text:`The union of registered SDK error-code strings.`},{kind:`text`,text:`@remarks: Localize cause and action by code, never display a raw stack to users.`},{kind:`code`,text:`const code: DeviceSdkErrorCode = DEVICE_SDK_ERROR_CODES.InvalidArgument;`},{kind:`code`,text:`type DeviceSdkErrorCode = typeof DEVICE_SDK_ERROR_CODES[keyof typeof DEVICE_SDK_ERROR_CODES];`}]},{name:`DeviceSdkErrorContext`,kind:`type`,blocks:[{kind:`text`,text:`Bounded scalar context attached to a host SDK failure.`},{kind:`text`,text:`@remarks: Do not put keys, tokens, raw identifiers or macro text in support-facing context. It is diagnostic metadata, not a recovery command.`},{kind:`code`,text:`const context: DeviceSdkErrorContext = { attempts };`},{kind:`code`,text:`type DeviceSdkErrorContext = Readonly<Record<string, string | number | boolean>>;`}]},{name:`DeviceSdkUserAction`,kind:`type`,blocks:[{kind:`text`,text:`A coarse SDK action category for application error handling.`},{kind:`text`,text:`@remarks: Retry is not permission to repeat an uncertain mutation. Refine it with operation, verificationRequired and device error context.`},{kind:`code`,text:`const action: DeviceSdkUserAction = error.userAction;`},{kind:`code`,text:`type DeviceSdkUserAction = 'Retry' | 'Reconnect' | 'UpdateWorkspace' | 'RestartTransaction' | 'KeepDeviceConnected' | 'CheckPackage' | 'ContactSupport' | 'None';`}]},{name:`DeviceSemanticTransport`,kind:`interface`,blocks:[{kind:`text`,text:`Internal semantic boundary implemented by decoded packet transports and test models.`},{kind:`text`,text:`@remarks: execute accepts a correlated request and abort signal. subscribe returns
both the acknowledgement and cleanup handle and delivers events independently.
close must release pending receives/listeners. The client normalizes transport
errors; no raw reports or arbitrary commands cross into DeviceClient.`},{kind:`code`,text:`const client = new CapkeeV1Client(transport);
await client.hello();`},{kind:`code`,text:`interface DeviceSemanticTransport {
    execute(request: SemanticRequest, signal: AbortSignal): Promise<SemanticResponse>;
    subscribe(request: SubscribeEventsRequest, listener: (event: DeviceEvent) => void, signal: AbortSignal): Promise<SemanticSubscriptionResult>;
    close(): Promise<void>;
}`}]},{name:`DeviceSubscription`,kind:`interface`,blocks:[{kind:`text`,text:`Owns one module-scoped event listener and its health observation.`},{kind:`text`,text:`@remarks: close is local transport cleanup, not a configuration rollback. A failed close can be explicitly retried; discard subscriptions when their route is lost.`},{kind:`code`,text:`try { consume(subscription.health()); } finally { await subscription.close(); }`},{kind:`code`,text:`interface DeviceSubscription {
    readonly subscriptionGeneration: number;
    readonly heartbeatIntervalMs: number;
    readonly eventQueueCapacity: number;
    health(nowMs?: number): DeviceSubscriptionHealth;
    close(): Promise<void>;
}`}]},{name:`DeviceSubscriptionAcknowledgement`,kind:`interface`,blocks:[{kind:`text`,text:`The target's accepted subscription generation, heartbeat interval and queue capacity.`},{kind:`text`,text:`@remarks: These values describe this subscription, not a host timing guarantee. Rebinding a module requires a new subscription.`},{kind:`code`,text:`const generation = acknowledgement.subscriptionGeneration;`},{kind:`code`,text:`interface DeviceSubscriptionAcknowledgement {
    readonly subscribed: true;
    readonly subscriptionGeneration: number;
    readonly heartbeatIntervalMs: number;
    readonly eventQueueCapacity: number;
}`}]},{name:`DeviceSubscriptionHealth`,kind:`interface`,blocks:[{kind:`text`,text:`A local liveness/loss observation for a device-acknowledged subscription generation.`},{kind:`text`,text:`@remarks: Times use the host clock used by the subscription, not deviceTicks. A healthy heartbeat is not configuration verification.`},{kind:`code`,text:`const health = subscription.health();`},{kind:`code`,text:`interface DeviceSubscriptionHealth {
    readonly status: DeviceSubscriptionHealthStatus;
    readonly subscriptionGeneration: number;
    readonly heartbeatIntervalMs: number;
    readonly unhealthyAfterMs: number;
    readonly eventQueueCapacity: number;
    readonly lastEventAtMs: number | null;
    readonly lastHeartbeatAtMs: number | null;
    readonly lastEventSequence: number | null;
    readonly droppedEventCount: number;
    readonly sequenceLossDetected: boolean;
}`}]},{name:`DeviceSubscriptionHealthStatus`,kind:`type`,blocks:[{kind:`text`,text:`Classifies observed subscription liveness and loss without diagnosing hardware.`},{kind:`text`,text:`@remarks: AwaitingHeartbeat and Unhealthy are observation states, not proof of a faulty device. LossDetected records missed delivery; Closed is terminal locally.`},{kind:`code`,text:`if (health.status === 'LossDetected') requestReadback();`},{kind:`code`,text:`type DeviceSubscriptionHealthStatus = 'AwaitingHeartbeat' | 'Healthy' | 'Unhealthy' | 'LossDetected' | 'Closed';`}]},{name:`DeviceTransaction`,kind:`interface`,blocks:[{kind:`text`,text:`A single-writer, topology-bound configuration transaction created by DeviceClient.begin.`},{kind:`text`,text:`@remarks: Use Stage → validate → Commit → verify for cross-generation compatibility. validate becomes local only after canonical Unsupported; abort is pre-commit only. Never automatically repeat an uncertain write.`},{kind:`code`,text:`const transaction = await client.begin(['Lighting']);`},{kind:`code`,text:`interface DeviceTransaction {
    readonly transactionId: TransactionId;
    readonly state: TransactionState;
    /** True after commit dispatch until legacy Verify or Commit/event/readback evidence resolves the outcome. */
    readonly verificationRequired: boolean;
    stage(change: DeviceChangeSet, options?: DeviceCallOptions): Promise<TransactionProgress>;
    validate(options?: DeviceCallOptions): Promise<TransactionProgress>;
    commit(options?: DeviceCallOptions): Promise<TransactionProgress>;
    verify(options?: DeviceCallOptions): Promise<VerificationResult>;
    /** Host cancellation is not rollback; abort is accepted only before commit. */
    abort(options?: DeviceCallOptions): Promise<TransactionProgress>;
}`}]},{name:`DiagnosticsCounter`,kind:`interface`,blocks:[{kind:`text`,text:`One domain-scoped numeric diagnostic counter.`},{kind:`text`,text:`@remarks: Interpret code within its domain and the current diagnostic contract. A counter or capability alone does not prove physical health.`},{kind:`code`,text:`const rgbCounters = diagnostics.counters.filter(counter => counter.domain === 'RGB');`},{kind:`code`,text:`interface DiagnosticsCounter {
    readonly domain: 'USB' | 'CFG' | 'KEY' | 'RGB' | 'LINK' | 'UPD' | 'BOOT';
    readonly code: number;
    readonly value: number;
}`}]},{name:`DiagnosticsSnapshot`,kind:`interface`,blocks:[{kind:`text`,text:`Device-observed diagnostics, reset cause, topology epoch and recovery flag.`},{kind:`text`,text:`@remarks: Recovery evidence blocks mutations. Device ticks are not host wall-clock timestamps; do not expose identity or macro content in anonymous support exports.`},{kind:`code`,text:`const diagnostics = await client.getDiagnostics();`},{kind:`code`,text:`interface DiagnosticsSnapshot {
    readonly topologyEpoch: TopologyEpoch;
    readonly capturedAtDeviceTicks: number;
    readonly counters: readonly DiagnosticsCounter[];
    readonly lastResetCause: number;
    readonly recoveryRequired: boolean;
}`}]},{name:`FactoryResetRequest`,kind:`interface`,blocks:[{kind:`text`,text:`Binds an explicitly authorized reset to device identity, current revision and a physical confirmation token.`},{kind:`text`,text:`@remarks: Capability and target authorization are still required. Never invent a token, log its value or use zero for an unread revision.`},{kind:`code`,text:`await client.factoryReset({ expectedDeviceId, expectedConfigurationRevision, physicalConfirmationToken });`},{kind:`code`,text:`interface FactoryResetRequest {
    readonly expectedDeviceId: string;
    readonly expectedConfigurationRevision: number;
    readonly physicalConfirmationToken: string;
}`}]},{name:`FailedTransactionProgress`,kind:`type`,blocks:[{kind:`text`,text:`Terminal transaction rejection returned in place of a successful
verification result. Keeping the discriminant narrow prevents callers from
treating an arbitrary progress record as active-state evidence.`},{kind:`text`,text:`@remarks: A Failed record needs matching transaction identity and nonempty errors
on both generations. It is not Commit acknowledgement or rollback proof.`},{kind:`code`,text:`if (progress.state === 'Failed') reportErrors(progress.errors);`},{kind:`code`,text:`type FailedTransactionProgress = TransactionProgress & {
    readonly state: 'Failed';
};`}]},{name:`FirmwareConfigurationMigration`,kind:`interface`,blocks:[{kind:`text`,text:`Declares the source schema interval and target schema of a signed package.`},{kind:`text`,text:`@remarks: Metadata does not perform migration. Preserve the original configuration and verify the target's result before discarding recovery data.`},{kind:`code`,text:`const targetSchema = packageFile.configurationMigration.targetSchema;`},{kind:`code`,text:`interface FirmwareConfigurationMigration {
    readonly minimumSourceSchema: number;
    readonly maximumSourceSchema: number;
    readonly targetSchema: number;
}`}]},{name:`FirmwareImageSegment`,kind:`interface`,blocks:[{kind:`text`,text:`Describes image-byte coverage and semantic target-load metadata.`},{kind:`text`,text:`@remarks: imageOffset indexes imageBytes. Only the target may authorize loadAddress; this type is not a raw memory-write API.`},{kind:`code`,text:`const bytes = image.slice(segment.imageOffset, segment.imageOffset + segment.byteLength);`},{kind:`code`,text:`interface FirmwareImageSegment {
    /** Offset into \`imageBytes\`, not a device address. */
    readonly imageOffset: number;
    /** Target address is semantic metadata; only the device may authorize the range. */
    readonly loadAddress: number;
    readonly byteLength: number;
}`}]},{name:`FirmwareLoaderCompatibility`,kind:`interface`,blocks:[{kind:`text`,text:`The inclusive minimum and maximum loader versions accepted by a package.`},{kind:`text`,text:`@remarks: Version comparison here is package compatibility only; never reuse it to infer transaction generation or runtime capability.`},{kind:`code`,text:`const compatibility = packageFile.loaderCompatibility;`},{kind:`code`,text:`interface FirmwareLoaderCompatibility {
    readonly minimumVersion: string;
    readonly maximumVersion: string;
}`}]},{name:`FirmwareReleaseChannel`,kind:`type`,blocks:[{kind:`text`,text:`The release-channel metadata carried by a signed package.`},{kind:`text`,text:`@remarks: Production is a label, not signature validation or publication approval. The device and release process must authorize it.`},{kind:`code`,text:`const channel: FirmwareReleaseChannel = 'Development';`},{kind:`code`,text:`type FirmwareReleaseChannel = 'Development' | 'Beta' | 'Production';`}]},{name:`FirmwareSignatureAlgorithm`,kind:`type`,blocks:[{kind:`text`,text:`Recognized signature encodings for structural package preflight.`},{kind:`text`,text:`@remarks: Naming an algorithm does not verify a signature or select a production trust policy; authentication belongs to the device.`},{kind:`code`,text:`const algorithm: FirmwareSignatureAlgorithm = packageFile.signatureAlgorithm;`},{kind:`code`,text:`type FirmwareSignatureAlgorithm = 'Ed25519' | 'EcdsaP256Sha256Raw';`}]},{name:`isDeviceSdkError`,kind:`function`,blocks:[{kind:`text`,text:`Narrows an arbitrary caught value to this SDK's error class.`},{kind:`text`,text:`@remarks: An instanceof check is local to this SDK instance; serialized errors are not class instances.`},{kind:`text`,text:`@param value: - Caught value to inspect.`},{kind:`text`,text:`@returns: True only for DeviceSdkError instances; does not throw.`},{kind:`code`,text:`if (isDeviceSdkError(error)) recordCode(error.code);`},{kind:`code`,text:`function isDeviceSdkError(value: unknown): value is DeviceSdkError`}]},{name:`KeyAction`,kind:`type`,blocks:[{kind:`text`,text:`A typed action for one physical key on one layer.`},{kind:`text`,text:`@remarks: Hello capabilities and limits bound layers and slots. Consumer actions may be rejected by the target; inspect the Stage response rather than parsing firmwareVersion.`},{kind:`code`,text:`const action: KeyAction = { kind: 'KeyboardUsage', usageId };`},{kind:`code`,text:`type KeyAction = {
    readonly kind: 'Disabled';
} | {
    readonly kind: 'Transparent';
} | {
    readonly kind: 'KeyboardUsage';
    readonly usageId: number;
} | {
    readonly kind: 'ConsumerUsage';
    readonly usageId: number;
} | {
    readonly kind: 'MacroSlot';
    readonly slot: number;
} | {
    readonly kind: 'LayerMomentary';
    readonly layer: number;
} | {
    readonly kind: 'LayerToggle';
    readonly layer: number;
} | {
    readonly kind: 'LayerDefault';
    readonly layer: number;
};`}]},{name:`KeyAssignment`,kind:`interface`,blocks:[{kind:`text`,text:`Binds an action to moduleId + localRow + localCol + layer.`},{kind:`text`,text:`@remarks: Never use array position or screen coordinates as persistent identity. A routed write must contain only keys owned by its selected module.`},{kind:`code`,text:`const assignment: KeyAssignment = { address, action };`},{kind:`code`,text:`interface KeyAssignment {
    readonly address: PhysicalKeyAddress;
    readonly action: KeyAction;
}`}]},{name:`KeymapSnapshot`,kind:`interface`,blocks:[{kind:`text`,text:`Device-read key assignments and their topology epoch and nonzero configuration revision.`},{kind:`text`,text:`@remarks: Use this configurationRevision as Stage.expectedRevision; zero means unread/invalid, not an initial configuration. Read the selected route before writing on either generation.`},{kind:`code`,text:`const before = await client.getKeymap();`},{kind:`code`,text:`interface KeymapSnapshot {
    readonly topologyEpoch: TopologyEpoch;
    readonly configurationRevision: number;
    readonly source: 'device';
    readonly assignments: readonly KeyAssignment[];
}`}]},{name:`LightingScene`,kind:`interface`,blocks:[{kind:`text`,text:`A compact requested lighting scene, brightness, speed and palette.`},{kind:`text`,text:`@remarks: PerKeyStatic maps primary/secondary/tertiary to keys 0/1/2 and requires speed 0 plus tertiary. Other kinds must not carry a nonzero tertiary.`},{kind:`code`,text:`const scene: LightingScene = { kind: 'PerKeyStatic', brightness, speed: 0, primary, secondary, tertiary };`},{kind:`code`,text:`interface LightingScene {
    readonly kind: LightingSceneKind;
    readonly brightness: number;
    /** Must be 0 for PerKeyStatic. */
    readonly speed: number;
    /** PerKeyStatic: key 0 (far). */
    readonly primary: RgbColor;
    /** PerKeyStatic: key 1 (middle). */
    readonly secondary: RgbColor;
    /**
     * PerKeyStatic only: key 2 (near). Absent (or all zero) for every other
     * kind; the device rejects a non-zero tertiary elsewhere.
     */
    readonly tertiary?: RgbColor;
}`}]},{name:`LightingSceneKind`,kind:`type`,blocks:[{kind:`text`,text:`The SDK's scene-kind vocabulary; use this union as the scene catalogue source.`},{kind:`text`,text:`@remarks: Catalogue presence alone is not target support; gate Lighting with capabilities and handle target rejection.`},{kind:`code`,text:`const kind: LightingSceneKind = 'PerKeyStatic';`},{kind:`code`,text:`type LightingSceneKind = 'Off' | 'Static' | 'ReactiveTrail' | 'Breathing' | 'CoordinateWave' | 'PerKeyStatic';`}]},{name:`LightingSnapshot`,kind:`interface`,blocks:[{kind:`text`,text:`Device-read lighting state for the selected route, epoch and nonzero revision.`},{kind:`text`,text:`@remarks: A rendered preview is not this snapshot. Confirm a write with transaction verification and exact GetLighting readback on either transaction generation.`},{kind:`code`,text:`const current = await client.getLighting();`},{kind:`code`,text:`interface LightingSnapshot {
    readonly topologyEpoch: TopologyEpoch;
    readonly configurationRevision: number;
    readonly source: 'device';
    readonly scene: LightingScene;
}`}]},{name:`MacroSlot`,kind:`interface`,blocks:[{kind:`text`,text:`A zero-based macro slot and its ordered, bounded steps.`},{kind:`text`,text:`@remarks: Use hello.limits.macroSlotCount and macroStepCapacity across the stored set; do not hardcode a product capacity.`},{kind:`code`,text:`const slot: MacroSlot = { slot: selectedSlot, steps };`},{kind:`code`,text:`interface MacroSlot {
    readonly slot: number;
    readonly steps: readonly MacroStep[];
}`}]},{name:`MacroSnapshot`,kind:`interface`,blocks:[{kind:`text`,text:`Device-read macro slots for the currently routed module.`},{kind:`text`,text:`@remarks: configurationRevision must be nonzero and coherent with other configuration reads. Six- and four-operation clients consume the same snapshot shape.`},{kind:`code`,text:`const before = await client.getMacros();`},{kind:`code`,text:`interface MacroSnapshot {
    readonly topologyEpoch: TopologyEpoch;
    readonly configurationRevision: number;
    readonly source: 'device';
    readonly slots: readonly MacroSlot[];
}`}]},{name:`MacroStep`,kind:`type`,blocks:[{kind:`text`,text:`One finite keyboard, Consumer tap or millisecond delay instruction.`},{kind:`text`,text:`@remarks: ConsumerTap acceptance is target-dependent. Handle a rejection with numeric 353 from unsupported targets; determine support from the response, not a firmware version string. Slot/total-step budgets come from Hello.limits.`},{kind:`code`,text:`const step: MacroStep = { kind: 'Delay', durationMs };`},{kind:`code`,text:`type MacroStep = {
    readonly kind: 'KeyDown';
    readonly usageId: number;
} | {
    readonly kind: 'KeyUp';
    readonly usageId: number;
} | {
    readonly kind: 'ConsumerTap';
    readonly usageId: number;
} | {
    readonly kind: 'Delay';
    readonly durationMs: number;
};`}]},{name:`readWorkspaceDeviceSnapshot`,kind:`function`,blocks:[{kind:`text`,text:`Reads one coherent, device-authoritative workspace view. Browser mirrors are
never promoted into this result. A topology/configuration change retries the
complete snapshot instead of mixing values from different epochs.`},{kind:`text`,text:`@param client: - Initialized or new client, already bound to the intended module.`},{kind:`text`,text:`@param options: - Abort signal and bounded timeout for each constituent read.`},{kind:`text`,text:`@returns: A coherent snapshot of this route, not all modules' settings.`},{kind:`text`,text:`@throws: DeviceSdkError for failed reads, invalid relationships (SDK_006), or
exhausted topology/revision reconciliation (SDK_009).`},{kind:`text`,text:`@remarks: Both transaction generations share these read operations. The helper
retries only reads; it never routes, mutates or restores a stale draft.`},{kind:`code`,text:`const snapshot = await readWorkspaceDeviceSnapshot(client, { signal });`},{kind:`code`,text:`function readWorkspaceDeviceSnapshot(client: DeviceClient, options?: DeviceCallOptions): Promise<WorkspaceDeviceSnapshot>`}]},{name:`RgbColor`,kind:`interface`,blocks:[{kind:`text`,text:`An RGB color with integer channels in the inclusive range 0–255.`},{kind:`text`,text:`@remarks: These are requested scene channels, not measured emitted light. Device brightness and power limiting can attenuate them.`},{kind:`code`,text:`const color: RgbColor = { red, green, blue };`},{kind:`code`,text:`interface RgbColor {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
}`}]},{name:`SemanticRejection`,kind:`type`,blocks:[{kind:`text`,text:`A canonical payloadless device rejection, including four-operation Unsupported probes.`},{kind:`text`,text:`@remarks: The status and nonempty error list must be validated together. The shim
recognizes only the exact Unsupported operation evidence, not any SDK_013 error.`},{kind:`code`,text:`if (response.status === 'Unsupported' && response.body === null) inspect(response.errors);`},{kind:`code`,text:`type SemanticRejection = ResponseBase<DeviceOperation, null> & {
    readonly status: 'Busy' | 'Unsupported' | 'WrongState';
};`}]},{name:`SemanticRequest`,kind:`type`,blocks:[{kind:`text`,text:`A discriminated, correlated high-level transport request.`},{kind:`text`,text:`@remarks: This is an integration boundary, not permission to send arbitrary reports. Session/request/transaction/epoch correlation applies on both generations.`},{kind:`code`,text:`if (request.operation === 'Stage') inspect(request.change.resource);`},{kind:`code`,text:`type SemanticRequest = RequestBase<'Hello'> | RequestBase<'GetTopology'> | RequestBase<'SubscribeEvents'> | RequestBase<'GetKeymap'> | RequestBase<'GetMacros'> | RequestBase<'GetLighting'> | RequestBase<'GetDiagnostics'> | (RequestBase<'Begin'> & {
    readonly resources: readonly DeviceChangeSet['resource'][];
}) | (RequestBase<'Stage'> & {
    readonly change: DeviceChangeSet;
}) | RequestBase<'Validate'> | RequestBase<'Commit'> | RequestBase<'Verify'> | RequestBase<'Abort'> | (RequestBase<'FactoryReset'> & {
    readonly reset: FactoryResetRequest;
}) | RequestBase<'GetUpdateStatus'> | (RequestBase<'BeginSignedUpdate'> & {
    readonly packageFile: SignedFirmwarePackage;
}) | RequestBase<'GetActiveLayer'> | (RequestBase<'SetActiveLayer'> & {
    readonly layer: number;
}) | (RequestBase<'RouteSession'> & {
    readonly moduleId: ModuleId;
}) | (RequestBase<'ControlSession'> & {
    readonly action: SessionControlAction;
}) | (RequestBase<'ControlRoutedSession'> & {
    readonly action: SessionControlAction;
});`}]},{name:`SemanticResponse`,kind:`type`,blocks:[{kind:`text`,text:`A decoded semantic response or canonical payloadless rejection.`},{kind:`text`,text:`@remarks: Validate correlation and body before use. Four-operation Commit may carry evidence; Unsupported Validate/Verify is not a successful response.`},{kind:`code`,text:`if (response.operation === 'GetKeymap' && response.body !== null) inspect(response.body);`},{kind:`code`,text:`type SemanticResponse = SemanticRejection | ResponseBase<'Hello', HelloResponse> | ResponseBase<'GetTopology', TopologySnapshot> | ResponseBase<'SubscribeEvents', DeviceSubscriptionAcknowledgement> | ResponseBase<'GetKeymap', KeymapSnapshot> | ResponseBase<'GetMacros', MacroSnapshot> | ResponseBase<'GetLighting', LightingSnapshot> | ResponseBase<'GetDiagnostics', DiagnosticsSnapshot> | ResponseBase<'Begin', TransactionProgress> | ResponseBase<'Stage', TransactionProgress> | ResponseBase<'Validate', TransactionProgress> | ResponseBase<'Commit', TransactionProgress> | ResponseBase<'Verify', VerificationResult | FailedTransactionProgress> | ResponseBase<'Abort', TransactionProgress> | ResponseBase<'FactoryReset', VerificationResult | FailedTransactionProgress> | ResponseBase<'GetUpdateStatus', UpdateStatus> | ResponseBase<'BeginSignedUpdate', UpdateStatus> | ResponseBase<'GetActiveLayer', ActiveLayerState> | ResponseBase<'SetActiveLayer', Pick<ActiveLayerState, 'activeLayer'>> | ResponseBase<'RouteSession', {
    readonly moduleId: ModuleId;
}> | ResponseBase<'ControlSession', {
    readonly action: SessionControlAction;
}> | ResponseBase<'ControlRoutedSession', {
    readonly action: SessionControlAction;
}>;`}]},{name:`SemanticSubscriptionResult`,kind:`interface`,blocks:[{kind:`text`,text:`Pairs the subscription acknowledgement with the cleanup handle acquired during setup.`},{kind:`text`,text:`@remarks: On an invalid acknowledgement, close the acquired handle before reporting failure to the caller.`},{kind:`code`,text:`await result.subscription.close();`},{kind:`code`,text:`interface SemanticSubscriptionResult {
    readonly response: SubscribeEventsResponse;
    readonly subscription: SemanticTransportSubscription;
}`}]},{name:`SemanticTransportSubscription`,kind:`interface`,blocks:[{kind:`text`,text:`A transport-owned close handle for one event listener.`},{kind:`text`,text:`@remarks: Closing must release listener resources; it does not undo device configuration or supply a physical disconnect.`},{kind:`code`,text:`await subscription.close();`},{kind:`code`,text:`interface SemanticTransportSubscription {
    close(): Promise<void>;
}`}]},{name:`SignedFirmwarePackage`,kind:`interface`,blocks:[{kind:`text`,text:`Public-safe semantic update package. This is not a raw Flash container and
does not expose signing keys or low-level address operations. The device is
the final authority for signature, layout, rollback and migration checks.`},{kind:`text`,text:`@remarks: This is separate from the tray app's vendor-loader firmware-package
format. A supported TypeScript shape never enables the Update capability.`},{kind:`code`,text:`const checked = await validateAndCopySignedFirmwarePackage(packageFile, hello);`},{kind:`code`,text:`interface SignedFirmwarePackage {
    readonly packageFormatVersion: number;
    readonly productFamily: string;
    /** Stable machine identity, not the customer-facing model label. */
    readonly modelId: string;
    readonly pcbRevisions: readonly string[];
    readonly firmwareVersion: string;
    readonly rollbackCounter: number;
    readonly loaderCompatibility: FirmwareLoaderCompatibility;
    readonly configurationMigration: FirmwareConfigurationMigration;
    readonly releaseChannel: FirmwareReleaseChannel;
    readonly buildProvenanceSha256: string;
    readonly imageBytes: Uint8Array;
    readonly imageSha256: string;
    readonly segments: readonly FirmwareImageSegment[];
    readonly publicKeyId: string;
    readonly signatureAlgorithm: FirmwareSignatureAlgorithm;
    readonly signatureFormatVersion: number;
    readonly signature: Uint8Array;
    /** Audit information only; never a device trust-time or rollback source. */
    readonly createdAt: string;
}`}]},{name:`SubscribeEventsRequest`,kind:`type`,blocks:[{kind:`text`,text:`The SubscribeEvents specialization of a semantic request.`},{kind:`text`,text:`@remarks: The same request context is used for the acknowledgement and listener setup; events are received independently of later responses.`},{kind:`code`,text:`const operation: SubscribeEventsRequest['operation'] = 'SubscribeEvents';`},{kind:`code`,text:`type SubscribeEventsRequest = Extract<SemanticRequest, {
    readonly operation: 'SubscribeEvents';
}>;`}]},{name:`SubscribeEventsResponse`,kind:`type`,blocks:[{kind:`text`,text:`The typed acknowledgement returned by subscription setup.`},{kind:`text`,text:`@remarks: This type alone is not a runtime check. Validate generation/interval/capacity and subscribed=true before exposing the listener.`},{kind:`code`,text:`const body: SubscribeEventsResponse['body'] = acknowledgement;`},{kind:`code`,text:`type SubscribeEventsResponse = Extract<SemanticResponse, {
    readonly operation: 'SubscribeEvents';
}>;`}]},{name:`TopologyLink`,kind:`interface`,blocks:[{kind:`text`,text:`A device-reported parent-port to child-ingress connection.`},{kind:`text`,text:`@remarks: Both module IDs come from the same complete topology epoch; do not infer links from screen position or module order.`},{kind:`code`,text:`const outgoing = topology.links.filter(link => sameId(link.parentModuleId, selectedId));`},{kind:`code`,text:`interface TopologyLink {
    readonly parentModuleId: ModuleId;
    readonly parentPortIndex: number;
    readonly childModuleId: ModuleId;
    readonly childIngressPortIndex: number;
}`}]},{name:`TopologyModule`,kind:`interface`,blocks:[{kind:`text`,text:`One device-reported module, with its stable identity, local input grid and physical port geometry.`},{kind:`text`,text:`@remarks: Preserve logicalX/logicalY, orientation and port indices exactly. A separate screen projection is not device topology. Storage capacity is not a measured product limit.`},{kind:`code`,text:`const root = topology.modules.find(module => module.root);`},{kind:`code`,text:`interface TopologyModule {
    readonly moduleId: ModuleId;
    readonly sessionAddress: number;
    readonly boardRevision: string;
    readonly orientation: number;
    readonly keyCount: number;
    readonly inputType: DeviceInputType;
    readonly inputRows: number;
    readonly inputColumns: number;
    readonly portCount: number;
    readonly rgbCount: number;
    readonly logicalX: number;
    readonly logicalY: number;
    readonly root: boolean;
}`}]},{name:`TopologySnapshot`,kind:`interface`,blocks:[{kind:`text`,text:`A bounded topology observation with a nonzero serial epoch and an explicit completeness flag.`},{kind:`text`,text:`@remarks: An incomplete snapshot must not enable edits. After a changed epoch, reread Hello/topology and explicitly bind the selected module again.`},{kind:`code`,text:`const topology = await client.getTopology();`},{kind:`code`,text:`interface TopologySnapshot {
    readonly epoch: TopologyEpoch;
    readonly complete: boolean;
    readonly modules: readonly TopologyModule[];
    readonly links: readonly TopologyLink[];
}`}]},{name:`TransactionProgress`,kind:`interface`,blocks:[{kind:`text`,text:`A transaction state/status observation, optionally with durable Commit evidence.`},{kind:`text`,text:`@remarks: The optional evidence fields are an all-or-none group on Committed/Verified records. Accepted is not saved; Committed can still await active-state verification.`},{kind:`code`,text:`const progress = await transaction.commit();`},{kind:`code`,text:`interface TransactionProgress {
    readonly transactionId: TransactionId;
    readonly state: TransactionState;
    readonly status: DeviceStatus;
    readonly errors: readonly DeviceError[];
    /** Optional as a group: durable Commit evidence on four-operation devices. */
    readonly configurationRevision?: number;
    readonly topologyEpoch?: TopologyEpoch;
    readonly activeStateObserved?: boolean;
}`}]},{name:`UpdateState`,kind:`type`,blocks:[{kind:`text`,text:`A semantic signed-update lifecycle state, including failure and recovery-required outcomes.`},{kind:`text`,text:`@remarks: This contract does not enable updates on targets lacking the capability. RecoveryRequired is not Idle and cannot be cleared by refreshing the UI.`},{kind:`code`,text:`if (status.state === 'RecoveryRequired') showRecoveryInstructions();`},{kind:`code`,text:`type UpdateState = 'Idle' | 'Receiving' | 'Validating' | 'ReadyToActivate' | 'Activating' | 'RecoveryRequired' | 'Complete' | 'Failed';`}]},{name:`UpdateStatus`,kind:`interface`,blocks:[{kind:`text`,text:`Device-reported update progress and terminal error information.`},{kind:`text`,text:`@remarks: acceptedBytes is not arbitrary bytes sent by the host. Complete requires coherent byte counts and digest; a disconnect is not success.`},{kind:`code`,text:`const status = await client.getUpdateStatus();`},{kind:`code`,text:`interface UpdateStatus {
    readonly state: UpdateState;
    readonly acceptedBytes: number;
    readonly expectedBytes: number;
    readonly imageSha256: string | null;
    readonly error: DeviceError | null;
}`}]},{name:`validateAndCopyDeviceErrors`,kind:`function`,blocks:[{kind:`text`,text:`Checks domain/code/context/retry/recovery fields and detaches target errors.`},{kind:`text`,text:`@param operation: - Calling operation for diagnostics.`},{kind:`text`,text:`@param errors: - Bounded decoded device-error array.`},{kind:`text`,text:`@returns: Detached errors preserving unrecognized numeric codes for forward-compatible reporting.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyDeviceErrors('Stage', response.errors)`},{kind:`code`,text:`function validateAndCopyDeviceErrors(operation: DeviceOperation, errors: readonly DeviceError[]): readonly DeviceError[]`}]},{name:`validateAndCopyDiagnostics`,kind:`function`,blocks:[{kind:`text`,text:`Validates bounded diagnostic counters and recovery metadata.`},{kind:`text`,text:`@param value: - Decoded diagnostics snapshot.`},{kind:`text`,text:`@returns: Detached DiagnosticsSnapshot; neither a health verdict nor proof of physical function.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyDiagnostics(response.body)`},{kind:`code`,text:`function validateAndCopyDiagnostics(value: DiagnosticsSnapshot): DiagnosticsSnapshot`}]},{name:`validateAndCopyEvent`,kind:`function`,blocks:[{kind:`text`,text:`Checks a known semantic event and copies its public payload.`},{kind:`text`,text:`@param value: - Decoded known DeviceEvent.`},{kind:`text`,text:`@returns: A detached event or null for invalid known payloads; not a replacement for the high-level event boundary.`},{kind:`text`,text:`@throws: Runtime errors are normalized by CapkeeV1Client's event boundary.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyEvent(event)`},{kind:`code`,text:`function validateAndCopyEvent(value: DeviceEvent): DeviceEvent | null`}]},{name:`validateAndCopyFailedProgress`,kind:`function`,blocks:[{kind:`text`,text:`Checks a terminal Failed/VerificationFailed response with nonempty device errors.`},{kind:`text`,text:`@param operation: - Calling operation for diagnostics.`},{kind:`text`,text:`@param value: - Decoded failure progress.`},{kind:`text`,text:`@param transactionId: - Expected transaction identity.`},{kind:`text`,text:`@returns: Detached Failed progress, never active-state or successful-commit evidence.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyFailedProgress('Commit', progress, transaction.transactionId)`},{kind:`code`,text:`function validateAndCopyFailedProgress(operation: DeviceOperation, value: TransactionProgress, transactionId: TransactionId): TransactionProgress & { readonly state: 'Failed' }`}]},{name:`validateAndCopyHello`,kind:`function`,blocks:[{kind:`text`,text:`Validates canonical Hello metadata and detaches the public result.`},{kind:`text`,text:`@param value: - Decoded Hello response.`},{kind:`text`,text:`@returns: HelloResponse with only allowlisted fields. Capabilities, not version-string parsing, control behavior.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyHello(response.body)`},{kind:`code`,text:`function validateAndCopyHello(value: HelloResponse): HelloResponse`}]},{name:`validateAndCopyKeymap`,kind:`function`,blocks:[{kind:`text`,text:`Validates device-read keymap metadata, canonical address order, actions and limits.`},{kind:`text`,text:`@param value: - Decoded keymap snapshot.`},{kind:`text`,text:`@param hello: - Validated Hello supplying layer and macro-slot limits.`},{kind:`text`,text:`@returns: Detached KeymapSnapshot with nonzero revision; topology ownership is additionally checked by the workspace reader.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyKeymap(response.body, hello)`},{kind:`code`,text:`function validateAndCopyKeymap(value: KeymapSnapshot, hello: HelloResponse): KeymapSnapshot`}]},{name:`validateAndCopyLighting`,kind:`function`,blocks:[{kind:`text`,text:`Validates scene channels, metadata and the PerKeyStatic tertiary/speed rule.`},{kind:`text`,text:`@param value: - Decoded lighting snapshot.`},{kind:`text`,text:`@returns: Detached LightingSnapshot. On both transaction generations PerKeyStatic requires tertiary and speed zero.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyLighting(response.body)`},{kind:`code`,text:`function validateAndCopyLighting(value: LightingSnapshot): LightingSnapshot`}]},{name:`validateAndCopyMacros`,kind:`function`,blocks:[{kind:`text`,text:`Validates canonical slots and the total macro-step budget from Hello.`},{kind:`text`,text:`@param value: - Decoded macro snapshot.`},{kind:`text`,text:`@param hello: - Validated Hello with served slot and total-step limits.`},{kind:`text`,text:`@returns: Detached MacroSnapshot. Shape validity does not prove ConsumerTap acceptance on a particular target.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyMacros(response.body, hello)`},{kind:`code`,text:`function validateAndCopyMacros(value: MacroSnapshot, hello: HelloResponse): MacroSnapshot`}]},{name:`validateAndCopyProgress`,kind:`function`,blocks:[{kind:`text`,text:`Checks transaction identity, expected state/status and optional complete evidence.`},{kind:`text`,text:`@param operation: - Calling operation for coded errors.`},{kind:`text`,text:`@param value: - Decoded progress.`},{kind:`text`,text:`@param transactionId: - Expected transaction identity.`},{kind:`text`,text:`@param expectedState: - Required state discriminant.`},{kind:`text`,text:`@param expectedStatus: - Required status discriminant.`},{kind:`text`,text:`@returns: Detached progress. Four-operation Commit evidence is accepted only as a complete revision/epoch/active group.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyProgress('Stage', progress, transaction.transactionId, 'Staged', 'Accepted')`},{kind:`code`,text:`function validateAndCopyProgress(operation: DeviceOperation, value: TransactionProgress, transactionId: TransactionId, expectedState: TransactionState, expectedStatus: DeviceStatus): TransactionProgress`}]},{name:`validateAndCopySignedFirmwarePackage`,kind:`function`,blocks:[{kind:`text`,text:`Performs host-side compatibility and structural checks, then returns one
detached byte snapshot. It does not authenticate the signature or approve
target memory ranges; the device must repeat and own those decisions.`},{kind:`text`,text:`@param packageFile: - Complete semantic package; bytes are copied before async hashing.`},{kind:`text`,text:`@param hello: - Validated target model/PCB/loader identity.`},{kind:`text`,text:`@returns: Detached package after structural, compatibility and image-digest checks.`},{kind:`text`,text:`@throws: DeviceSdkError: SDK_015 for invalid metadata/shape/compatibility or SDK_011
for an image digest mismatch. No signing key is accepted or produced.`},{kind:`text`,text:`@remarks: Transaction generation is irrelevant; Update capability and target
authentication are independently required. This helper performs no device I/O.`},{kind:`code`,text:`const checked = await validateAndCopySignedFirmwarePackage(packageFile, hello);`},{kind:`code`,text:`function validateAndCopySignedFirmwarePackage(packageFile: SignedFirmwarePackage, hello: HelloResponse): Promise<SignedFirmwarePackage>`}]},{name:`validateAndCopyTopology`,kind:`function`,blocks:[{kind:`text`,text:`Validates a bounded topology and copies identities, geometry and links.`},{kind:`text`,text:`@param value: - Decoded topology snapshot.`},{kind:`text`,text:`@returns: Detached TopologySnapshot; preserves reported coordinates rather than computing placement.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyTopology(response.body)`},{kind:`code`,text:`function validateAndCopyTopology(value: TopologySnapshot): TopologySnapshot`}]},{name:`validateAndCopyUpdateStatus`,kind:`function`,blocks:[{kind:`text`,text:`Checks update-state-specific counts, digest and failure evidence.`},{kind:`text`,text:`@param operation: - Update status/start operation for diagnostics.`},{kind:`text`,text:`@param value: - Decoded update status.`},{kind:`text`,text:`@returns: Detached UpdateStatus. Structural checks are not signature verification or target update support.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyUpdateStatus('GetUpdateStatus', response.body)`},{kind:`code`,text:`function validateAndCopyUpdateStatus(operation: 'GetUpdateStatus' | 'BeginSignedUpdate', value: UpdateStatus): UpdateStatus`}]},{name:`validateAndCopyVerification`,kind:`function`,blocks:[{kind:`text`,text:`Requires matching Verified identity, nonzero revision/epoch and active-state evidence.`},{kind:`text`,text:`@param operation: - Verify or FactoryReset.`},{kind:`text`,text:`@param value: - Decoded verification.`},{kind:`text`,text:`@param transactionId: - Expected transaction identity (zero for FactoryReset).`},{kind:`text`,text:`@returns: Detached VerificationResult. A Committed acknowledgement alone cannot pass this validator.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_006) for invalid response fields.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateAndCopyVerification('Verify', result, transaction.transactionId)`},{kind:`code`,text:`function validateAndCopyVerification(operation: 'Verify' | 'FactoryReset', value: VerificationResult, transactionId: TransactionId): VerificationResult`}]},{name:`validateChangeSet`,kind:`function`,blocks:[{kind:`text`,text:`Checks and copies a caller's staged resource using current Hello limits.`},{kind:`text`,text:`@param value: - Requested resource with nonzero device-read expectedRevision.`},{kind:`text`,text:`@param hello: - Validated current Hello.`},{kind:`text`,text:`@returns: Detached DeviceChangeSet. The target still owns revision matching and semantic acceptance in both generations.`},{kind:`text`,text:`@throws: DeviceSdkError (SDK_015) for invalid staged arguments.`},{kind:`text`,text:`@remarks: Internal typed-decoder helper; hostile JavaScript objects/getters must use the
high-level CapkeeV1Client boundary, which normalizes runtime exceptions. No device I/O.`},{kind:`code`,text:`validateChangeSet(change, hello)`},{kind:`code`,text:`function validateChangeSet(value: DeviceChangeSet, hello: HelloResponse): DeviceChangeSet`}]},{name:`validDeviceIdentityText`,kind:`function`,blocks:[{kind:`text`,text:`Checks bounded, nonempty canonical identity text without controls, spaces or malformed Unicode.`},{kind:`text`,text:`@param value: - Arbitrary value to inspect.`},{kind:`text`,text:`@returns: A boolean type guard; no device I/O or generation inference.`},{kind:`code`,text:`validDeviceIdentityText(hello.deviceId)`},{kind:`code`,text:`function validDeviceIdentityText(value: unknown): value is string`}]},{name:`validPhysicalConfirmationTokenText`,kind:`function`,blocks:[{kind:`text`,text:`Checks the bounded unpadded base64url shape of a confirmation token.`},{kind:`text`,text:`@param value: - Arbitrary candidate token; never log it.`},{kind:`text`,text:`@returns: A boolean shape check only, not proof of physical presence, freshness or authorization.`},{kind:`code`,text:`validPhysicalConfirmationTokenText(token)`},{kind:`code`,text:`function validPhysicalConfirmationTokenText(value: unknown): value is string`}]},{name:`VerificationResult`,kind:`interface`,blocks:[{kind:`text`,text:`A terminal verification result with active-state evidence and nonzero revision/epoch.`},{kind:`text`,text:`@remarks: Legacy devices supply Verify; four-operation devices use Commit evidence plus a matching event or bounded resource readback. The host must still compare intended values.`},{kind:`code`,text:`const verified = await transaction.verify();`},{kind:`code`,text:`interface VerificationResult extends Omit<TransactionProgress, 'state' | 'status'> {
    readonly state: 'Verified';
    readonly status: 'Verified';
    /** Proves the device reported Active before Verified; an ACK alone is insufficient. */
    readonly activeStateObserved: true;
    readonly configurationRevision: number;
    readonly topologyEpoch: TopologyEpoch;
}`}]},{name:`WorkspaceDeviceSnapshot`,kind:`interface`,blocks:[{kind:`text`,text:`A coherent read of Hello, complete topology and supported resources on the current route.`},{kind:`text`,text:`@remarks: Unsupported resources are null. Configuration snapshots agree on revision/epoch; this is not an all-module backup. Route each module explicitly for a tree profile.`},{kind:`code`,text:`const snapshot = await readWorkspaceDeviceSnapshot(client);`},{kind:`code`,text:`interface WorkspaceDeviceSnapshot {
    readonly source: 'device';
    readonly hello: HelloResponse;
    readonly topology: TopologySnapshot & {
        readonly complete: true;
    };
    readonly keymap: KeymapSnapshot | null;
    readonly macros: MacroSnapshot | null;
    readonly lighting: LightingSnapshot | null;
    readonly diagnostics: DiagnosticsSnapshot | null;
    readonly activeLayer: ActiveLayerState | null;
}`}]},{name:`WorkspaceFeatureAvailability`,kind:`interface`,blocks:[{kind:`text`,text:`Feature flags derived from Hello capabilities, limits and topology.`},{kind:`text`,text:`@remarks: These are device availability, not release policy. Applications may further restrict exposure; never infer support from the firmware version string.`},{kind:`code`,text:`if (presentation.features.lighting) showLightingEditor();`},{kind:`code`,text:`interface WorkspaceFeatureAvailability {
    readonly keymap: boolean;
    readonly macros: boolean;
    readonly lighting: boolean;
    readonly diagnostics: boolean;
    readonly update: boolean;
    readonly factoryReset: boolean;
    readonly activeLayer: boolean;
}`}]},{name:`WorkspaceModulePresentation`,kind:`interface`,blocks:[{kind:`text`,text:`A detached module view retaining device-reported identity and geometry.`},{kind:`text`,text:`@remarks: Input count and ports are data, not fixed three-key constants. Screen projection must not overwrite the reported coordinates.`},{kind:`code`,text:`const module = presentation.modules.find(item => sameId(item.moduleId, selectedId));`},{kind:`code`,text:`interface WorkspaceModulePresentation {
    readonly moduleId: ModuleId;
    readonly boardRevision: string;
    readonly inputType: DeviceInputType;
    readonly inputRows: number;
    readonly inputColumns: number;
    readonly inputCount: number;
    readonly portCount: number;
    readonly rgbCount: number;
    readonly logicalX: number;
    readonly logicalY: number;
    readonly orientation: number;
    readonly root: boolean;
}`}]},{name:`WorkspacePresentation`,kind:`interface`,blocks:[{kind:`text`,text:`A device-authoritative display model with capability-based features and resource totals.`},{kind:`text`,text:`@remarks: It describes observations, not physical qualification. Limits come from Hello, including module storage capacity and macro budget.`},{kind:`code`,text:`const presentation = deriveWorkspacePresentation(snapshot);`},{kind:`code`,text:`interface WorkspacePresentation {
    readonly source: 'device';
    readonly manufacturerName: string;
    readonly modelName: string;
    readonly modelId: string;
    readonly pcbRevision: string;
    readonly firmwareVersion: string;
    readonly recoveryMode: boolean;
    readonly features: WorkspaceFeatureAvailability;
    readonly limits: DeviceLimits;
    readonly modules: readonly WorkspaceModulePresentation[];
    readonly totals: {
        readonly inputCount: number;
        readonly portCount: number;
        readonly rgbCount: number;
    };
}`}]}],identity:{displayName:`Capkee Universal SDK`,registryIdentifier:`@capkee/universal-sdk`,version:`2.0.0`,license:`Apache-2.0`,holder:`chally.choi`},firstReleaseVersion:`1.0.0`,releaseStatus:`published`,release:{packageUrl:`https://www.npmjs.com/package/@capkee/universal-sdk`,tarballUrl:`https://registry.npmjs.org/@capkee/universal-sdk/-/universal-sdk-2.0.0.tgz`,installCommand:`npm install @capkee/universal-sdk@2.0.0`,sha256:`618636af48fd35bd6491063ab0c37cdcf788be5df6cff15dac62d1820c93caea`,integrity:`sha512-l5+cDn0kXQzYMSFxpf1wZlcZPJivTaFQtsgLUwbfq3tvZGJubsmVWiRXVodzmPviXRq7PDxEGYzNMEEExbKPJg==`},versioning:[{kind:`heading`,text:`SDK versioning policy`},{kind:`text`,text:`Status: approved for the first release. Package SemVer,
Device Protocol major/minor and firmware version are independent identities.
Do not infer capability or transaction generation from any version string.`},{kind:`text`,text:`- Before 1.0, an intentional public API incompatibility increments the minor
  version; compatible corrections increment patch. Prereleases use explicit
  prerelease identifiers and are never promoted implicitly.
- From 1.0, removal/renaming, a type narrowing, a new required argument, changed
  error identity or incompatible lifecycle/serialization behaviour requires major.
- Additive methods, optional fields and supported scene kinds require minor and
  capability/unknown-value tests. Exhaustive unions can be breaking for consumers:
  assess compile impact rather than assuming every enum addition is compatible.
- Documentation corrections and compatible bug fixes require patch. Safety fixes
  that reject formerly admitted invalid input must state the affected contract;
  do not hide compatibility impact under a security or patch label.
- Export names, error codes/actions, session isolation, nonzero revision admission,
  fail-closed parsing and cancellation-not-rollback are part of the public contract.
  Internal paths are not exported. Wire compatibility is separately lead-owned.`},{kind:`text`,text:`Every candidate must pass deterministic runtime/API/package checks, strict API
documentation, guide type/runtime tests on both generations, all repository gates,
tarball allowlist/license review and owner release approval. Record exact commit,
lockfile, tool versions and SHA-256 artifact checksums. Do not include source maps,
manufacturing/private-link sources, signing keys or physical test claims.
The owner has selected the npm scope, initial public version, license, publishing
identity and support scope, and approved first publication.
Signing/provenance and actual publication are separate authorized release work.`}],changelog:[{kind:`heading`,text:`SDK changelog`},{kind:`heading`,text:`2.0.0 — published 2026-09-13`},{kind:`text`,text:`- Negotiate advertised session ownership automatically before subscription,
  routing and mutation; keep Hello/Get-only inspection free of ownership I/O.
- Share explicit and automatic negotiation, fence uncertain failures, preserve
  independent cancellation, and bound cleanup of acknowledged or uncertain Open.
- Release managed volatile ownership on close and retain committed configuration;
  expiry requires negotiated target support, not a host-only close.
- Pin the actual published 1.0.0 artifact in compatibility tests. Its unmanaged
  subscription/route exhaustion remains a separately recorded legacy limitation.
- Separate immutable registry history from exact-content candidate publication
  admission. The owner approved this major version and the same support scope for
  2.x on 2026-09-13; only the exact approved payload can pass the staging guard.
- Extend the public semantic-operation union from 19 to 21 operations with
  ControlSession and ControlRoutedSession. Exhaustive custom transport mappings
  must handle these additions; the unchanged old mapping fails candidate type
  checking instead of being silently treated as compatible.`},{kind:`text`,text:`These changes add public lifetime APIs and alter resource-acquisition/close
behavior on advertised targets. The major version records this compatibility
change; it does not overwrite published 1.0.0. Registry publication and the exact
artifact were independently verified on 2026-09-13.`},{kind:`heading`,text:`1.0.0 — approved for first publication`},{kind:`text`,text:`- Adopt the owner-decided package identity through one shared metadata source.
- Generate the manifest and package README from the recorded publication decision.
- Permit publication of the reviewed staged package; continue rejecting raw-source packing.
- Include the existing Apache-2.0 license text in the reviewed staging allowlist.
- Keep API exports, runtime bytes and wire contracts unchanged by the rename.`},{kind:`heading`,text:`Initial implementation — unreleased`},{kind:`text`,text:`- First review-only packaging of the existing generated ESM runtime and types.
- Complete generated API export documentation, including public client methods.
- Response-driven compatibility with six-operation and four-operation transactions.
- Device-reported, nonzero configuration revisions and module-routed sessions.
- Executable developer examples and generated SDK-to-user error guidance.
- Deterministic, allowlisted staging; no new runtime dependency or publication.`},{kind:`text`,text:`These describe source/model contracts, not firmware release or physical evidence.
An approved candidate does not imply a new registry publication.`}]},U=s(`<pre class="svelte-1qc66wz"><code class="svelte-1qc66wz"> </code></pre>`),W=s(`<p class="heading svelte-1qc66wz"> </p>`),fe=s(`<p class="svelte-1qc66wz"> </p>`),G=s(`<div class="documentation svelte-1qc66wz" lang="en" dir="ltr"></div>`);function K(t,r){var i=G();E(i,21,()=>r.blocks,l,(t,r)=>{var i=y(),o=T(i),s=t=>{var n=U(),i=a(n),o=a(i,!0);m(i),m(n),u(()=>b(o,D(r).text)),e(t,n)},c=t=>{var n=W(),i=a(n,!0);m(n),u(()=>b(i,D(r).text)),e(t,n)},l=t=>{var n=fe(),i=a(n,!0);m(n),u(()=>b(i,D(r).text)),e(t,n)};n(o,e=>{D(r).kind===`code`?e(s):D(r).kind===`heading`?e(c,1):e(l,-1)}),e(t,i)}),m(i),u(()=>i.dir=i.dir),e(t,i)}async function pe(e,t,n=I){let r;try{if(!t)throw Error(`clipboard unavailable`);return await Promise.race([t(e),new Promise((e,t)=>{r=setTimeout(()=>t(Error(`clipboard timeout`)),n)})]),{ok:!0}}catch{return{ok:!1,code:j.SYS_CLIPBOARD_UNAVAILABLE}}finally{r!==void 0&&clearTimeout(r)}}var q=s(`<label><input type="radio" name="sdk-artifact-idea" class="svelte-su5u7j"/> <!> <span><strong class="svelte-su5u7j"> </strong><span class="description svelte-su5u7j"> </span></span></label>`),me=s(`<p class="svelte-su5u7j"> </p>`),he=s(`<p class="svelte-su5u7j"><bdi> </bdi></p><p class="svelte-su5u7j"> </p><p class="svelte-su5u7j"> </p>`,1),ge=s(`<section class="ai-starter svelte-su5u7j" data-sdk-ai=""><h2 class="svelte-su5u7j"> </h2> <p class="intro svelte-su5u7j"> </p> <fieldset class="svelte-su5u7j"><legend class="svelte-su5u7j"> </legend> <div class="idea-choices svelte-su5u7j"></div></fieldset> <label class="custom-idea svelte-su5u7j"> <input type="text" class="svelte-su5u7j"/></label> <div class="actions svelte-su5u7j"><button class="primary svelte-su5u7j" type="button"><!> </button> <button type="button" class="svelte-su5u7j"> </button></div> <div class="copy-result svelte-su5u7j" role="status" aria-live="polite"><!></div> <details class="svelte-su5u7j"><summary class="svelte-su5u7j"> </summary> <div class="prompt-heading svelte-su5u7j"><label for="sdk-ai-prompt" class="svelte-su5u7j"> </label><span class="svelte-su5u7j"> </span></div> <textarea id="sdk-ai-prompt" readonly="" spellcheck="false" class="svelte-su5u7j"></textarea></details> <p class="boundary svelte-su5u7j"> </p></section>`);function _e(r,s){v(s,!0);let y=[],S=c(d(P[0].id)),O=c(``),N=c(!1),F=c(!1),I=c(null),R,z=g(()=>[...oe.map(e=>k(`public.sdk.ai.prompt.${e}`,{idea:D(O).trim()||k(`landing.showcase.idea.${D(S)}.title`),description:D(O).trim()?``:k(`landing.showcase.idea.${D(S)}.body`),packageName:s.packageName,version:s.version,installCommand:s.installCommand,docs:ie(`sdk`,A()),guide:`${ie(`guide`,A())}#guide-developer`})),`${k(`public.sdk.ai.referenceLabel`)}\n\n${s.apiReference}`,`${k(`public.sdk.ai.exampleLabel`)}\n\n${s.connectionSample}`].join(`

`)),B=g(()=>D(I)?.text===D(z)?D(I).ok?`copied`:`failed`:`idle`);async function se(){if(D(N))return;let e=D(z);f(N,!0);let t=await pe(e,navigator.clipboard?.writeText?.bind(navigator.clipboard));f(I,{text:e,ok:t.ok},!0),f(N,!1)}async function ce(){f(F,!0),await t(),R.focus(),R.select()}var V=ge(),le=a(V),ue=a(le,!0);m(le);var de=i(le,2),H=a(de,!0);m(de);var U=i(de,2),W=a(U),fe=a(W,!0);m(W);var G=i(W,2);E(G,21,()=>P,l,(t,n)=>{var r=q();let s;var c=a(r);h(c);var l,d=i(c,2);M(d,{get name(){return D(n).icon},size:24});var p=i(d,2),g=a(p),_=a(g,!0);m(g);var v=i(g),C=a(v,!0);m(v),m(p),m(r),u((e,t)=>{s=re(r,1,`svelte-su5u7j`,null,s,{selected:D(S)===D(n).id}),l!==(l=D(n).id)&&(c.value=(c.__value=D(n).id)??``),b(_,e),b(C,t)},[()=>k(`landing.showcase.idea.${D(n).id}.title`),()=>k(`landing.showcase.idea.${D(n).id}.body`)]),o(`click`,c,()=>{f(O,``)}),o(`change`,c,()=>{f(O,``)}),x(y,[],c,()=>(D(n).id,D(S)),e=>f(S,e)),e(t,r)}),m(G),m(U);var K=i(U,2),_e=a(K,!0),J=i(_e);h(J),m(K);var Y=i(K,2),X=a(Y),ve=a(X);M(ve,{name:`copy`,size:20});var ye=i(ve,1,!0);m(X);var be=i(X,2),xe=a(be,!0);m(be),m(Y);var Z=i(Y,2),Se=a(Z),Ce=t=>{var n=me(),r=a(n,!0);m(n),u(e=>b(r,e),[()=>k(`public.sdk.ai.copied`)]),e(t,n)},we=t=>{var n=he(),r=T(n),o=a(r),s=a(o,!0);m(o),m(r);var c=i(r),l=a(c,!0);m(c);var d=i(c),f=a(d,!0);m(d),u((e,t)=>{b(s,j.SYS_CLIPBOARD_UNAVAILABLE),b(l,e),b(f,t)},[()=>k(`error.SYS_009.cause`),()=>k(`error.SYS_009.remedy`)]),e(t,n)};n(Se,e=>{D(B)===`copied`?e(Ce):D(B)===`failed`&&e(we,1)}),m(Z);var Q=i(Z,2),Te=a(Q),Ee=a(Te,!0);m(Te);var $=i(Te,2),De=a($),Oe=a(De,!0);m(De);var ke=i(De),Ae=a(ke,!0);m(ke),m($);var je=i($,2);te(je),C(je,e=>R=e,()=>R),m(Q);var Me=i(Q,2),Ne=a(Me,!0);m(Me),m(V),u((e,t,n,r,i,a,o,s,c,l,u)=>{_(V,`id`,L),b(ue,e),b(H,t),b(fe,n),b(_e,r),_(J,`maxlength`,ae),_(J,`placeholder`,i),X.disabled=D(N),b(ye,a),b(xe,o),b(Ee,s),b(Oe,c),b(Ae,l),w(je,D(z)),b(Ne,u)},[()=>k(`public.sdk.ai.title`),()=>k(`public.sdk.ai.body`),()=>k(`public.sdk.ai.choose`),()=>k(`public.sdk.ai.ideaLabel`),()=>k(`public.sdk.ai.ideaPlaceholder`),()=>k(D(N)?`public.sdk.ai.copying`:`public.sdk.ai.copy`),()=>k(`public.sdk.ai.select`),()=>k(`public.sdk.ai.promptLabel`),()=>k(`public.sdk.ai.promptLabel`),()=>k(`public.sdk.ai.editNote`),()=>k(`public.sdk.ai.note`)]),ne(J,()=>D(O),e=>f(O,e)),o(`click`,X,se),o(`click`,be,ce),p(`open`,`toggle`,Q,e=>f(F,e),()=>D(F)),e(r,V),ee()}r([`click`,`change`]);function J(e){return F.map(t=>{let n=e.find(e=>e.name===t)?.blocks.find(e=>e.kind===`code`&&[`class`,`interface`,`type`].some(n=>e.text.startsWith(`${n} ${t} `)));return n?`### ${t}\n\n\`\`\`typescript\n${n.text}\n\`\`\``:``}).filter(Boolean).join(`

`)}var Y=s(`<a class="svelte-n45rf"> </a>`),X=s(`<div data-sdk-install="" dir="ltr"><!></div> <nav class="svelte-n45rf"><a data-sdk-registry="" rel="external noreferrer" class="svelte-n45rf"> </a> <a data-sdk-tarball="" rel="external noreferrer" class="svelte-n45rf"> </a></nav>`,1),ve=s(`<div><dt class="svelte-n45rf"> </dt><dd class="svelte-n45rf"><bdi> </bdi></dd></div>`),ye=s(`<p class="svelte-n45rf"> </p> <dl class="svelte-n45rf"><dt class="svelte-n45rf"> </dt><dd class="svelte-n45rf"><code dir="ltr"> </code></dd> <dt class="svelte-n45rf"> </dt><dd class="svelte-n45rf"><code dir="ltr"> </code></dd></dl>`,1),be=s(`<p class="status svelte-n45rf"> </p><p class="svelte-n45rf"> </p> <!> <dl class="identity svelte-n45rf" data-sdk-identity=""></dl> <p class="svelte-n45rf"> </p> <p class="svelte-n45rf"> </p> <!> <a href="#sdk-changelog" class="svelte-n45rf"> </a>`,1),xe=s(`<p class="svelte-n45rf"> </p> <!>`,1),Z=s(`<h3 class="svelte-n45rf"> </h3><p class="svelte-n45rf"> </p>`,1),Se=s(`<a class="svelte-n45rf"><bdi> </bdi></a>`),Ce=s(`<article class="svelte-n45rf"><h3 class="svelte-n45rf"><a class="svelte-n45rf"><bdi> </bdi></a></h3> <!></article>`),we=s(`<p class="svelte-n45rf"> </p>`),Q=s(`<h3 class="svelte-n45rf"><a class="svelte-n45rf"><bdi> </bdi></a></h3> <dl class="svelte-n45rf"><dt class="svelte-n45rf"> </dt><dd class="svelte-n45rf"> </dd><dt class="svelte-n45rf"> </dt><dd class="svelte-n45rf"> </dd></dl>`,1),Te=s(`<p role="status" class="svelte-n45rf"> </p>`),Ee=s(`<div class="sdk-page svelte-n45rf" data-sdk-page=""><!> <main class="svelte-n45rf"><h1 class="svelte-n45rf"> </h1> <p class="lede svelte-n45rf"> </p> <nav class="svelte-n45rf"></nav> <!> <section id="sdk-download" class="svelte-n45rf"><h2 class="svelte-n45rf"> </h2> <!></section> <section id="sdk-start" class="svelte-n45rf"><h2 class="svelte-n45rf"> </h2><p class="svelte-n45rf"> </p> <p class="svelte-n45rf"> </p> <!> <a class="svelte-n45rf"> </a></section> <section id="sdk-compatibility" class="svelte-n45rf"><h2 class="svelte-n45rf"> </h2><p class="svelte-n45rf"> </p> <div class="generations svelte-n45rf"><!> <!></div> <p class="svelte-n45rf"> </p> <!></section> <section id="sdk-reference" class="svelte-n45rf"><h2 class="svelte-n45rf"> </h2><p class="svelte-n45rf"> </p> <label class="svelte-n45rf"> <input type="search" spellcheck="false" class="svelte-n45rf"/></label> <p role="status" class="svelte-n45rf"> </p> <nav class="symbols svelte-n45rf"></nav> <div class="api-entries svelte-n45rf"></div></section> <section id="sdk-errors" class="svelte-n45rf"><h2 class="svelte-n45rf"> </h2><p class="svelte-n45rf"> </p> <!> <label class="svelte-n45rf"> <input type="search" spellcheck="false" dir="ltr" class="svelte-n45rf"/></label> <div class="errors svelte-n45rf"></div></section> <section id="sdk-changelog" class="svelte-n45rf"><h2 class="svelte-n45rf"> </h2><p class="svelte-n45rf"> </p><!></section> <nav class="svelte-n45rf"></nav></main></div>`);function $(r,s){v(s,!0);let d=[`ai`,`download`,`start`,`compatibility`,`reference`,`errors`,`changelog`],p=[`home`,`manual`,`downloads`,`support`],x=ce.filter(e=>[`connect`,`hello`,`keymap`,`lighting`].includes(e.id)),w=J(H.symbols),te=x.find(e=>e.id===`connect`).source,re=Object.keys(H.identity),ie={preparing:`public.sdk.preparing`,"awaiting-registry":`public.sdk.awaitingRegistry`,published:`public.sdk.published`},j=c(``),M,ae=c(``),P=g(()=>H.symbols.filter(e=>`${e.name} ${e.blocks.map(e=>e.text).join(` `)}`.toLowerCase().includes(D(j).trim().toLowerCase()))),F=g(()=>le.filter(e=>e.code.toLowerCase().includes(D(ae).trim().toLowerCase())));function I(e){return k(e).replace(/\{\w+\}/gu,k(`public.errors.unknownValue`))}S(()=>{let e=se(M);return t().then(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({block:`start`})),e});var L=Ee(),oe=a(L);R(oe,{});var U=i(oe,2),W=a(U),fe=a(W,!0);m(W);var G=i(W,2),pe=a(G,!0);m(G);var q=i(G,2);E(q,21,()=>d,l,(t,r)=>{var i=y(),o=T(i),s=t=>{var n=Y(),i=a(n,!0);m(n),u(e=>{_(n,`href`,`#sdk-${D(r)}`),b(i,e)},[()=>k(`public.sdk.${D(r)}.title`)]),e(t,n)};n(o,e=>{(D(r)!==`ai`||H.release)&&e(s)}),e(t,i)}),m(q);var me=i(q,2),he=e=>{_e(e,{get packageName(){return H.identity.registryIdentifier},get version(){return H.identity.version},get installCommand(){return H.release.installCommand},get apiReference(){return w},get connectionSample(){return te}})};n(me,e=>{H.release&&e(he)});var ge=i(me,2),$=a(ge),De=a($,!0);m($);var Oe=i($,2);z(Oe,{children:(t,r)=>{var o=be(),s=T(o),c=a(s,!0);m(s);var d=i(s),f=a(d,!0);m(d);var p=i(d,2),h=t=>{var n=X(),r=T(n),o=a(r);{let e=g(()=>[{kind:`code`,text:H.release.installCommand}]);K(o,{get blocks(){return D(e)}})}m(r);var s=i(r,2),c=a(s),l=a(c,!0);m(c);var d=i(c,2),f=a(d,!0);m(d),m(s),u((e,t,n)=>{r.dir=r.dir,_(s,`aria-label`,e),_(c,`href`,H.release.packageUrl),b(l,t),_(d,`href`,H.release.tarballUrl),b(f,n)},[()=>k(`public.sdk.download.title`),()=>k(`public.sdk.npmLink`),()=>k(`public.sdk.packageLink`)]),e(t,n)};n(p,e=>{H.release&&e(h)});var v=i(p,2);E(v,21,()=>re,l,(t,n)=>{var r=ve(),o=a(r),s=a(o,!0);m(o);var c=i(o),l=a(c),d=a(l,!0);m(l),m(c),m(r),u((e,t)=>{b(s,e),_(l,`data-sdk-identity-value`,D(n)),b(d,t)},[()=>k(`public.sdk.identity.${D(n)}`),()=>D(n)===`version`?k(`public.sdk.versionDisplay`,{version:H.identity.version}):H.identity[D(n)]]),e(t,r)}),m(v);var y=i(v,2),x=a(y,!0);m(y);var S=i(y,2),C=a(S,!0);m(S);var w=i(S,2),ee=t=>{{let n=g(()=>k(`public.sdk.integrity`));B(t,{get label(){return D(n)},icon:`code`,children:(t,n)=>{var r=ye(),o=T(r),s=a(o,!0);m(o);var c=i(o,2),l=a(c),d=a(l,!0);m(l);var f=i(l),p=a(f),h=a(p,!0);m(p),m(f);var g=i(f,2),_=a(g,!0);m(g);var v=i(g),y=a(v),x=a(y,!0);m(y),m(v),m(c),u((e,t,n)=>{b(s,e),b(d,t),b(h,H.release.sha256),p.dir=p.dir,b(_,n),b(x,H.release.integrity),y.dir=y.dir},[()=>k(`public.sdk.integrityNote`),()=>k(`public.sdk.sha256`),()=>k(`public.sdk.npmIntegrity`)]),e(t,r)},$$slots:{default:!0}})}};n(w,e=>{H.release&&e(ee)});var te=i(w,2),ne=a(te,!0);m(te),u((e,t,n,r,i)=>{_(s,`data-sdk-release`,H.releaseStatus),b(c,e),b(f,t),b(x,n),b(C,r),b(ne,i)},[()=>k(ie[H.releaseStatus]),()=>k(`public.sdk.download.body`),()=>k(`public.sdk.identity.note`),()=>k(`public.sdk.download.files`),()=>k(`public.sdk.changelog.title`)]),e(t,o)},$$slots:{default:!0}}),m(ge);var ke=i(ge,2),Ae=a(ke),je=a(Ae,!0);m(Ae);var Me=i(Ae),Ne=a(Me,!0);m(Me);var Pe=i(Me,2),Fe=a(Pe,!0);m(Pe);var Ie=i(Pe,2);E(Ie,17,()=>x,l,(t,n)=>{{let r=g(()=>k(D(n).titleKey));B(t,{get label(){return D(r)},icon:`code`,children:(t,r)=>{var o=xe(),s=T(o),c=a(s,!0);m(s);var l=i(s,2);{let e=g(()=>[{kind:`code`,text:D(n).source}]);K(l,{get blocks(){return D(e)}})}u(e=>b(c,e),[()=>k(D(n).bodyKey)]),e(t,o)},$$slots:{default:!0}})}});var Le=i(Ie,2),Re=a(Le,!0);m(Le),m(ke);var ze=i(ke,2),Be=a(ze),Ve=a(Be,!0);m(Be);var He=i(Be),Ue=a(He,!0);m(He);var We=i(He,2),Ge=a(We);z(Ge,{children:(t,n)=>{var r=Z(),o=T(r),s=a(o,!0);m(o);var c=i(o),l=a(c,!0);m(c),u((e,t)=>{b(s,e),b(l,t)},[()=>k(`public.sdk.six.title`),()=>k(`public.sdk.six.body`)]),e(t,r)},$$slots:{default:!0}});var Ke=i(Ge,2);z(Ke,{children:(t,n)=>{var r=Z(),o=T(r),s=a(o,!0);m(o);var c=i(o),l=a(c,!0);m(c),u((e,t)=>{b(s,e),b(l,t)},[()=>k(`public.sdk.four.title`),()=>k(`public.sdk.four.body`)]),e(t,r)},$$slots:{default:!0}}),m(We);var qe=i(We,2),Je=a(qe,!0);m(qe);var Ye=i(qe,2);{let e=g(()=>k(`public.sdk.versioning.original`));B(Ye,{get label(){return D(e)},icon:`code`,children:(e,t)=>{K(e,{get blocks(){return H.versioning}})},$$slots:{default:!0}})}m(ze);var Xe=i(ze,2),Ze=a(Xe),Qe=a(Ze,!0);m(Ze);var $e=i(Ze),et=a($e,!0);m($e);var tt=i($e,2),nt=a(tt,!0),rt=i(nt);h(rt),m(tt);var it=i(tt,2),at=a(it,!0);m(it);var ot=i(it,2);E(ot,21,()=>D(P),l,(t,n)=>{var r=Se(),i=a(r),o=a(i,!0);m(i),m(r),u(()=>{_(r,`href`,`#sdk-api-${D(n).name}`),b(o,D(n).name)}),e(t,r)}),m(ot);var st=i(ot,2);E(st,21,()=>D(P),e=>e.name,(t,n)=>{var r=Ce(),o=a(r),s=a(o),c=a(s),l=a(c,!0);m(c),m(s),m(o);var d=i(o,2);{let e=g(()=>k(`public.sdk.signature`));B(d,{get label(){return D(e)},icon:`code`,children:(e,t)=>{K(e,{get blocks(){return D(n).blocks}})},$$slots:{default:!0}})}m(r),u(()=>{_(r,`id`,`sdk-api-${D(n).name}`),_(r,`data-sdk-symbol`,D(n).name),_(s,`href`,`#sdk-api-${D(n).name}`),b(l,D(n).name)}),e(t,r)},t=>{var n=we(),r=a(n,!0);m(n),u(e=>b(r,e),[()=>k(`public.sdk.empty`)]),e(t,n)}),m(st),m(Xe);var ct=i(Xe,2),lt=a(ct),ut=a(lt,!0);m(lt);var dt=i(lt),ft=a(dt,!0);m(dt);var pt=i(dt,2);ue(pt,{get contact(){return de.contact}});var mt=i(pt,2),ht=a(mt,!0),gt=i(ht);h(gt),m(mt);var _t=i(mt,2);E(_t,21,()=>D(F),l,(t,n)=>{z(t,{children:(t,r)=>{var o=Q(),s=T(o),c=a(s),l=a(c),d=a(l,!0);m(l),m(c),m(s);var f=i(s,2),p=a(f),h=a(p,!0);m(p);var g=i(p),v=a(g,!0);m(g);var y=i(g),x=a(y,!0);m(y);var S=i(y),C=a(S,!0);m(S),m(f),u((e,t,r,i)=>{_(c,`href`,`#/errors/${D(n).code}`),b(d,D(n).code),b(h,e),b(v,t),b(x,r),b(C,i)},[()=>k(`public.errors.cause`),()=>I(D(n).causeKey),()=>k(`public.errors.remedy`),()=>I(D(n).remedyKey)]),e(t,o)},$$slots:{default:!0}})},t=>{var n=Te(),r=a(n,!0);m(n),u(e=>b(r,e),[()=>k(`public.errors.empty`)]),e(t,n)}),m(_t),m(ct);var vt=i(ct,2),yt=a(vt),bt=a(yt,!0);m(yt);var xt=i(yt),St=a(xt,!0);m(xt),K(i(xt),{get blocks(){return H.changelog}}),m(vt);var Ct=i(vt,2);E(Ct,21,()=>p,l,(t,n)=>{var r=Y(),i=a(r,!0);m(r),u((e,t)=>{_(r,`href`,e),b(i,t)},[()=>O(D(n),A()),()=>k(`public.${D(n)}.title`)]),o(`click`,r,e=>N.follow(e,D(n))),e(t,r)}),m(Ct),m(U),m(L),C(L,e=>M=e,()=>M),u((e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,v,y,x,S,C,w)=>{b(fe,e),b(pe,t),_(q,`aria-label`,n),b(De,r),b(je,i),b(Ne,a),b(Fe,o),_(Le,`href`,s),b(Re,c),b(Ve,l),b(Ue,u),b(Je,d),b(Qe,f),b(et,p),b(nt,m),b(at,h),_(ot,`aria-label`,g),b(ut,v),b(ft,y),b(ht,x),gt.dir=gt.dir,b(bt,S),b(St,C),_(Ct,`aria-label`,w)},[()=>k(`public.sdk.title`),()=>k(`public.sdk.description`),()=>k(`public.sdk.contents`),()=>k(`public.sdk.download.title`),()=>k(`public.sdk.start.title`),()=>k(`public.sdk.start.body`),()=>k(`public.sdk.examplesNote`),()=>`${O(`guide`,A())}#guide-developer`,()=>k(`guide.developer.title`),()=>k(`public.sdk.compatibility.title`),()=>k(`public.sdk.compatibility.body`),()=>k(`public.sdk.versioning.body`),()=>k(`public.sdk.reference.title`),()=>k(`public.sdk.originalNote`),()=>k(`public.sdk.search`),()=>k(`public.sdk.results`,{count:V(D(P).length,A())}),()=>k(`public.sdk.symbols`),()=>k(`public.sdk.errors.title`),()=>k(`public.errors.sdkNote`),()=>k(`public.errors.search`),()=>k(`public.sdk.changelog.title`),()=>k(`public.sdk.originalNote`),()=>k(`public.nav`)]),o(`click`,Le,e=>N.follow(e,`guide`)),ne(rt,()=>D(j),e=>f(j,e)),ne(gt,()=>D(ae),e=>f(ae,e)),e(r,L),ee()}r([`click`]);export{$ as default};