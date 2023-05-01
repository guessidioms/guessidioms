const mobileWidth = 400

if (deviceType() == "mobile") {
    fitToFullWidth()
}

function setViewPointScala(scala) {
    var view = document.getElementById("viewport-meta")
    view.content = "width=device-width, initial-scale=" + scala.toString()
}

function deviceType() {
    const ua = navigator.userAgent;
    const mobile = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
    const tablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/
    if (tablet.test(ua)) {
        return "tablet";
    } else if (mobile.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

function fitToFullWidth() {
    var innerWidth = window.innerWidth
    var scala = innerWidth / mobileWidth
    console.log("scala:" + scala.toString())
    setViewPointScala(scala)
}
