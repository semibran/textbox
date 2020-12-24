export default function Script (scenedata) {
  const script = []
  for (const [speakerid, content] of scenedata.script) {
    const speaker = scenedata.actors[speakerid]
    script.push({ speaker, content })
  }
  return script
}
