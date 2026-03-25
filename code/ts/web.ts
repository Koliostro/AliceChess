declare const LINK: string;

export function InitializeSocket() {
    const websocket = new WebSocket(LINK)

    enum HEADER {
        START = "START",
        WAIT = "WAIT",
        RECIVED = "RECIVED",
        END = "END",
    }

    interface MESSAGE {
        header : HEADER,
        data : string,
    }

    websocket.addEventListener("open", ()=> {
        console.log("Connected")

        let NewMessage : MESSAGE = {
            header: HEADER.START,
            data: "",
        }

        websocket.send(JSON.stringify(NewMessage))
    })

    websocket.addEventListener("close", ()=> {
        console.log(`Closed`)                          
    })

    websocket.addEventListener("message", (event) => {
        let readedMessage : MESSAGE = JSON.parse(event.data)

        console.log(`Recived: ${readedMessage.header}`);

        if (readedMessage.header === HEADER.RECIVED) {
            let HALTMessage = {
                header: HEADER.END,
                data: "",
            }

            websocket.send(JSON.stringify(HALTMessage))
        }
    })

    websocket.addEventListener("error", ()=> {
        console.log(`ERROR`)                          
    })
}
