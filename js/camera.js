class Camera {

    constructor(video) {
        this.video = video
        this.stream = null
        this.picture = null
    }

    turnOffCamera() {
        if (this.video) {
            this.video.pause();
            if (this.stream) {
                this.stream.getTracks().forEach(track => {
                    track.stop()
                })
            }
        }
    }

    takePicture() {
        let canvas = document.createElement('canvas')
        canvas.setAttribute('width', 300)
        canvas.setAttribute('height', 300)
        let context = canvas.getContext('2d')
        context.drawImage(this.video, 0, 0, canvas.width, canvas.height)
        this.picture = context.canvas.toDataURL()
        this.video.removeAttribute('src')
        this.video.load()
        return this.picture
    }

    turnOnFrontCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300
                }
            }).then(stream => {
                this.video.srcObject = stream;
                this.stream = stream;
                return true;
            }).catch(err => {
                console.log(err);
                return false
            })
        }
        return false
    }

    turnOnRearCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.turnOffCamera()
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode: {
                        exact: 'environment'
                    }
                },
            }).then(stream => {
                this.video.srcObject = stream;
                this.stream = stream;
                return true;
            }).catch(err => {
                return false
            })
        }
        return false
    }

}