let swDirectory = '/pwa-u2-t2/sw.js'
const url = window.location.href

if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        swDirectory = '/sw.js'
    }
    navigator.serviceWorker.register(swDirectory)
}

let txtPicture = ""
const pictures = $('#pictures')
const frontCamera = $('#btnfront')
const rearCamera = $('#btnrear')
const takePicture = $('#btntake')
const camera = new Camera($('#camera')[0])

frontCamera.on('click', () => {
    txtPicture = "Front-View Camera"
    camera.turnOnFrontCamera()
})

rearCamera.on('click', () => {
    txtPicture = "Rear-View Camera"
    camera.turnOnRearCamera()
})

takePicture.on('click', () => {
    camera.turnOffCamera()
    let picture = camera.takePicture()
    let img = $(`
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
    <div class="shadow border card h-100">
        <img src="${picture}" class="card-img-top" alt="photo">
        <div class="card-body">
          <p class="card-text">${txtPicture}</p>
        </div>
      </div>
    </div>
    `)
    pictures.append(img)
})

