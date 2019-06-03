if('serviceWorker' in navigator){
    console.log("SW Available")
    navigator.serviceWorker.register('./sw.js')
    .then(reg => {
        console.log("SW Registered");
    })
    .catch(err => console.error(err))
}

self.addEventListener('fetch', e => {
    e.preventDefault()
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if(response) {
                return response;
            }
            return fetch(e.request)
            .then(response => {
                var responseToCache = response.clone();
                caches.open('samplerv1')
                    .then(function(cache) {
                        cache.put(e.request, responseToCache);
                        return response;
                });
            })
            
        })
        

    )
    
})