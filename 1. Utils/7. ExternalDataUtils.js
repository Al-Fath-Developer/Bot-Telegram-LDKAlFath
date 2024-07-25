const ExternalDataUtils = {
    // Get data from external source    
    fetchDataWithCache: function (url, cacheKey, cacheDuration = 100) {
        let data = CacheService.getScriptCache().get(cacheKey)
        if (!data) {
            data = UrlFetchApp.fetch(url).getContentText()
            CacheService.getScriptCache().put(cacheKey, data, cacheDuration)
        }
        return data
    },
}
