let cgHandle = null
export const getCgHandleBox = () => {
  if (cgHandle) {
    return cgHandle
  } else {
    cgHandle = document.createElement('div')
    cgHandle.id = 'cg-handle'
    document.body.appendChild(cgHandle)

    return cgHandle
  }
}
