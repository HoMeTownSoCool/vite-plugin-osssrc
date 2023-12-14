import type { Plugin } from 'vite'

import type { OSSSrcOptions } from './types'
import { ELEMENTS, PREFIX } from './constant'
import { vueReg } from './rule'
import { matchSrcWithOSS, transformElement } from './helper'

export default function vitePluginOSSSrc(options: OSSSrcOptions) {
  const ossUrl = options.ossUrl
  if (!ossUrl)
    throw new Error('ossUrl is required')

  const elements = options.elements || ELEMENTS
  const prefix = options.prefix || PREFIX

  return <Plugin> {
    name: 'vite-plugin-osssrc',
    enforce: 'pre',
    transform(code, id) {
      if (!vueReg.test(id))
        return code
      const matchedElements = matchSrcWithOSS(code, elements, prefix)
      if (!matchedElements?.length)
        return code
      let transformCode = code
      matchedElements?.forEach((item) => {
        transformCode = transformCode.replace(item, transformElement(item, ossUrl, prefix))
      })
      return transformCode
    },
    handleHotUpdate(ctx) {
      const { file, server } = ctx
      if (!file.includes('.vue'))
        return
      server.ws.send({
        type: 'update',
        updates: [
          {
            type: 'js-update',
            path: file,
            acceptedPath: file,
            timestamp: new Date().getTime(),
          },
        ],
      })
    },
  }
}
