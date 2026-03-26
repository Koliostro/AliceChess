declare const LINK: string;

export let stateString = "";

export function InitializeSocket() {
    const websocket = new WebSocket(LINK)

    enum HEADER {
        START = "START",
        SET = "SET",
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

        let AnswerMesasge : MESSAGE
        switch (readedMessage.header) {
            case "SET":
                stateString = readedMessage.data;

                AnswerMesasge = {
                    header: HEADER.END,
                    data: "",
                }

                break
            case "RECIVED":
                AnswerMesasge = {
                    header: HEADER.WAIT,
                    data: "",
                }  
                break
            default:
                AnswerMesasge = {
                    header: HEADER.END,
                    data: "",
                }
                break
        }

        websocket.send(JSON.stringify(AnswerMesasge))
    })

    websocket.addEventListener("error", ()=> {
        console.log(`ERROR`)                          
    })
}
