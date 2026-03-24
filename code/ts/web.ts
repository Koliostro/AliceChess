declare const LINK: string;

export function InitializeSocket() {
    const websocket = new WebSocket(LINK)

    let message = {
        iteration : 0,
        content : "ping",
    }

    let ID : any

    websocket.addEventListener("open", ()=> {
        console.log("Connected")
        ID = setInterval(()=> {
            console.log(`Send ${message.content} : ${message.iteration}`)
            websocket.send(JSON.stringify(message))        
            message.iteration++;
            if (message.iteration > 5) {
                message.content = "END"
                websocket.send(JSON.stringify(message))
                clearInterval(ID)
            }
        }, 5000)    
    })

    websocket.addEventListener("close", ()=> {
        console.log(`Last: ${ID}`)                          
    })

    websocket.addEventListener("error", ()=> {
        console.log(`ERROR`)                          
    })
}
