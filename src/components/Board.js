import { useEffect } from "react"
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useParams } from "react-router-dom";

const db = getDatabase()

export default function Board() {


    const { roomCode } = useParams()

    useEffect(() => {

        let timeout

        const drawOnCanvas = () => {
            const canvas = document.querySelector('#board')
            const ctx = canvas.getContext('2d')

            const sketch = document.querySelector('#sketch')
            const sketch_style = getComputedStyle(sketch)
            canvas.width = parseInt(sketch_style.getPropertyValue('width'))
            canvas.height = parseInt(sketch_style.getPropertyValue('height'))

            const mouse = { x: 0, y: 0 }
            const last_mouse = { x: 0, y: 0 }

            /* Mouse Capturing Work */
            canvas.addEventListener('mousemove', function (e) {
                last_mouse.x = mouse.x
                last_mouse.y = mouse.y

                mouse.x = e.pageX - this.offsetLeft
                mouse.y = e.pageY - this.offsetTop
            }, false)

            /* Drawing on Paint App */
            ctx.lineWidth = 5
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'
            ctx.strokeStyle = 'blue'

            canvas.addEventListener('mousedown', e => {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false)

            canvas.addEventListener('mouseup', () => {
                canvas.removeEventListener('mousemove', onPaint, false);
            }, false)

            const onPaint = function () {
                ctx.beginPath()
                ctx.moveTo(last_mouse.x, last_mouse.y)
                ctx.lineTo(mouse.x, mouse.y)
                ctx.closePath()
                ctx.stroke()

                if (timeout !== undefined) clearTimeout(timeout)
                timeout = setTimeout(() => {
                    var base64ImageData = canvas.toDataURL("image/png")
                    set(ref(db, 'rooms/' + roomCode), {
                        imageData: base64ImageData
                    })
                }, 1000)
            }
        }

        const onDraw = () => {
            onValue(ref(db, 'rooms/' + roomCode), snapshot => {
                if (snapshot.val() === null) return
                const imageData = snapshot.val().imageData
                const image = new Image()
                const canvas = document.querySelector("#board")
                const ctx = canvas.getContext("2d")
                image.onload = () => ctx.drawImage(image, 0, 0)
                image.src = imageData
            })
        }

        drawOnCanvas()
        onDraw()

    }, [roomCode])

    return (
        <div className="flex h-full">
            <div id="sketch" className="m-auto align-baseline border-2 border-green-400" 
                style={{
                    width: "80vw",
                    height: "40vw"
                }} 
            >
                <canvas id="board" className="w-full h-full bg-gray-50"></canvas>
            </div>
        </div>
    )
}
