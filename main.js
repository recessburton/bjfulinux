(function() {
    var rainEngine = null;

    function startRain(image) {
        if (rainEngine || typeof RainyDay === "undefined") {
            return;
        }

        var crop = getCoverCrop(image, window.innerWidth, window.innerHeight);

        rainEngine = new RainyDay({
            image: image,
            parentElement: document.querySelector(".hero"),
            blur: 0,
            opacity: 0.88,
            crop: crop,
            width: window.innerWidth,
            height: window.innerHeight,
            fps: 30,
            enableCollisions: true,
            gravityAngle: Math.PI / 2.08,
        });

        rainEngine.rain([[1, 2, 7000]]);
        rainEngine.rain([[3, 3, 0.86], [5, 5, 0.9], [6, 2, 1]], 80);
    }

    function getCoverCrop(image, targetWidth, targetHeight) {
        var imageWidth = image.naturalWidth;
        var imageHeight = image.naturalHeight;
        var imageRatio = imageWidth / imageHeight;
        var targetRatio = targetWidth / targetHeight;
        var cropWidth = imageWidth;
        var cropHeight = imageHeight;
        var cropX = 0;
        var cropY = 0;

        if (imageRatio > targetRatio) {
            cropWidth = imageHeight * targetRatio;
            cropX = (imageWidth - cropWidth) / 2;
        } else {
            cropHeight = imageWidth / targetRatio;
            cropY = (imageHeight - cropHeight) / 2;
        }

        return [cropX, cropY, cropWidth, cropHeight];
    }

    function initRain() {
        var image = document.querySelector(".hero-background");

        if (!image) {
            return;
        }

        image.crossOrigin = "anonymous";

        if (image.complete && image.naturalWidth > 0) {
            startRain(image);
            return;
        }

        image.addEventListener("load", function() {
            startRain(image);
        }, { once: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initRain);
    } else {
        initRain();
    }
})();
