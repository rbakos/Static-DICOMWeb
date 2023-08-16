/**
 * Set plugin routes.
 *
 * @param {*} routerExpress root entry point for plugins routes (router express).
 * @param {*} params
 * @param {*} pluginsKey name of plugins configuration section.
 */
export default async function setPlugins(routerExpress, params, pluginsKey = "plugins") {
  if (!params) return;
  const loadPlugins = params[pluginsKey];
  if (loadPlugins) {
    for (let i = 0; i < loadPlugins.length; i++) {
      const pluginItem = loadPlugins[i];
      console.log(`Configuring ${pluginItem.pluginName}(${pluginItem.pluginModule}) on ${pluginItem.pluginRoute}`);
      const plugin = await import(pluginItem.pluginModule);
      const pluginDefault = plugin.default || plugin;
      const { setRoute } = pluginDefault[pluginItem.pluginName];
      setRoute(routerExpress, pluginItem);
    }
  }
}
