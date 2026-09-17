import{n as e}from"./capkee-v1-sdk-CITdKTw1.js";var t=`:scope > .public-header`;function n(e){let n=e.querySelector(t);if(!n)return()=>{};let r=e.style.scrollPaddingBlockStart,i=()=>{let t=getComputedStyle(n).position===`sticky`?n.getBoundingClientRect().height:0;e.style.scrollPaddingBlockStart=`${t}px`};i();let a=new ResizeObserver(i);return a.observe(n),()=>{a.disconnect(),e.style.scrollPaddingBlockStart=r}}var r={displayName:`Capkee Universal SDK`,registryIdentifier:`@capkee/universal-sdk`,version:`2.0.0`,license:`Apache-2.0`,holder:`chally.choi`}.registryIdentifier,i=Object.freeze([{code:e.RouteUnknownModule,causeKey:`guide.developer.route7.cause`,remedyKey:`guide.developer.route7.remedy`},{code:e.RouteCapacity,causeKey:`guide.developer.route8.cause`,remedyKey:`guide.developer.route8.remedy`}]),a=Object.freeze([{id:`connect`,titleKey:`guide.developer.connect.title`,bodyKey:`guide.developer.connect.body`,source:`import {
  CapkeeV1Client,
  type DeviceSemanticTransport,
} from '${r}'

export async function connectCapkee(
  hid: Pick<HID, 'requestDevice'>,
  filters: HIDDeviceFilter[],
  openTransport: (
    device: HIDDevice,
    signal: AbortSignal,
  ) => Promise<DeviceSemanticTransport>,
  signal = new AbortController().signal,
): Promise<CapkeeV1Client> {
  const [device] = await hid.requestDevice({ filters })
  if (!device) throw new DOMException('DEV_001', 'NotFoundError')
  return new CapkeeV1Client(await openTransport(device, signal))
}`},{id:`hello`,titleKey:`guide.developer.hello.title`,bodyKey:`guide.developer.hello.body`,source:`import {
  type CapkeeV1Client,
} from '${r}'

export function readHello(
  client: CapkeeV1Client,
): ReturnType<CapkeeV1Client['hello']> {
  return client.hello()
}`},{id:`keymap`,titleKey:`guide.developer.keymap.title`,bodyKey:`guide.developer.keymap.body`,source:`import {
  type CapkeeV1Client,
  type KeymapSnapshot,
} from '${r}'

export function readKeymap(
  client: CapkeeV1Client,
): Promise<KeymapSnapshot> {
  return client.getKeymap()
}`},{id:`lighting`,titleKey:`guide.developer.lighting.title`,bodyKey:`guide.developer.lighting.body`,source:`import {
  type CapkeeV1Client,
  type LightingScene,
  type LightingSnapshot,
} from '${r}'

export async function commitLighting(
  client: CapkeeV1Client,
  scene: LightingScene,
): Promise<LightingSnapshot> {
  // Keep a detached intent for comparison after asynchronous work.
  const intended = structuredClone(scene)
  const before = await client.getLighting()
  const transaction = await client.begin(['Lighting'])
  try {
    await transaction.stage({
      resource: 'Lighting',
      expectedRevision: before.configurationRevision,
      scene: intended,
    })
    // Six operations: remote Validate. Four: Unsupported → local shim.
    // Generation comes from responses, never a version-string branch.
    await transaction.validate()
    await transaction.commit()
    // Six: remote Verify. Four: Commit evidence → event → readback.
    const verified = await transaction.verify()
    const current = await client.getLighting()
    const sameColor = (a: LightingScene['tertiary'], b: LightingScene['tertiary']) =>
      a?.red === b?.red && a?.green === b?.green && a?.blue === b?.blue
    if (current.configurationRevision !== verified.configurationRevision ||
        current.scene.kind !== intended.kind ||
        current.scene.brightness !== intended.brightness ||
        current.scene.speed !== intended.speed ||
        !sameColor(current.scene.primary, intended.primary) ||
        !sameColor(current.scene.secondary, intended.secondary) ||
        !sameColor(current.scene.tertiary, intended.tertiary)) {
      throw new Error('PROTO_007')
    }
    return current
  } catch (error) {
    if (!transaction.verificationRequired &&
        ['Begun', 'Staged', 'Validated'].includes(transaction.state)) {
      try { await transaction.abort() } catch { await client.close() }
    }
    // After Commit dispatch: no Abort, replay or claimed rollback.
    throw error
  }
}`},{id:`module`,titleKey:`guide.developer.module.title`,bodyKey:`guide.developer.module.body`,source:`import {
  type CapkeeV1Client,
  type KeyAssignment,
  type KeymapSnapshot,
} from '${r}'

export async function commitModuleKeymap(
  openClient: () => Promise<CapkeeV1Client>,
  moduleId: Parameters<CapkeeV1Client['routeSession']>[0],
  assignments: readonly KeyAssignment[],
): Promise<KeymapSnapshot> {
  const client = await openClient()
  let root: typeof moduleId | null = null
  try {
    const hello = await client.hello()
    const topology = await client.getTopology()
    root = topology.modules.find((item) => item.root)?.moduleId ?? null
    if (!root || hello.topologyEpoch !== topology.epoch ||
        !topology.modules.some((item) =>
          item.moduleId.every((byte, index) => byte === moduleId[index]))) {
      throw new Error('SDK_009')
    }
    await client.routeSession(moduleId)
    const before = await client.getKeymap()
    const transaction = await client.begin(['Keymap'])
    try {
      await transaction.stage({
        resource: 'Keymap',
        expectedRevision: before.configurationRevision,
        assignments,
      })
      const committed = await transaction.commit()
      // Complete verification before releasing or changing managed ownership.
      const verified = await transaction.verify()
      const current = await client.getKeymap()
      if (current.topologyEpoch !== topology.epoch ||
          current.configurationRevision !== committed.configurationRevision ||
          current.configurationRevision !== verified.configurationRevision ||
          JSON.stringify(current.assignments) !== JSON.stringify(assignments)) {
        throw new Error('PROTO_007')
      }
      await client.routeSession(root)
      root = null
      return current
    } catch (error) {
      if (!transaction.verificationRequired &&
          ['Begun', 'Staged', 'Validated'].includes(transaction.state)) {
        try { await transaction.abort() } catch { await client.close() }
      }
      throw error
    }
  } finally {
    if (root) {
      try { await client.routeSession(root) } catch { /* Report the original failure. */ }
    }
    await client.close()
  }
}`},{id:`reconnect`,titleKey:`guide.developer.reconnect.title`,bodyKey:`guide.developer.reconnect.body`,source:`import {
  CapkeeV1Client,
  type DeviceSemanticTransport,
} from '${r}'

export async function reconnectCapkee(
  hid: Pick<HID, 'getDevices'>,
  select: (granted: readonly HIDDevice[]) => HIDDevice | undefined,
  openTransport: (device: HIDDevice) => Promise<DeviceSemanticTransport>,
  signal: AbortSignal,
): Promise<CapkeeV1Client | null> {
  signal.throwIfAborted()
  const granted = await hid.getDevices()
  signal.throwIfAborted()
  const selected = select(granted)
  if (!selected || !granted.includes(selected)) return null
  const client = new CapkeeV1Client(await openTransport(selected))
  try {
    signal.throwIfAborted()
    await client.hello({ signal })
    await client.getTopology({ signal })
    await client.getKeymap({ signal })
    await client.getLighting({ signal })
    await client.getMacros({ signal })
    return client
  } catch (error) {
    await client.close()
    throw error
  }
  // Close the old client on disconnect; keep unsaved intent separately.
  // No requestDevice prompt and no automatic mutation on reconnect.
  // Compare Hello identity; ask the user before rebinding a child route.
}`}]);export{i as n,n as r,a as t};