menzit.service('diff', [function () {

    function difference () {

        var
            a = document.getElementById('image-0'),     // Original image
            b = document.getElementById('image-1'),     // Altered image
            diffWrapper = document.getElementById('diff'); // Container div

        var
            diff, canvas, context;
        if (!a.complete || !b.complete) {
            // Images are loaded asynchronously.
            // Let's wait until they are ready.
            setTimeout(difference, 10);
        } else {
            // Once they are ready, create a diff.
            // This returns an ImageData object.
            diff = imagediff.diff(a, b);
            // Now create a canvas,
            canvas = imagediff.createCanvas(diff.width, diff.height);
            // get its context
            context = canvas.getContext('2d');
            // and finally draw the ImageData diff.
            context.putImageData(diff, 0, 0);
            // Add the canvas element to the container.
            diffWrapper.appendChild(canvas);
            return canvas.toDataURL("image/png").length;
        }
    }

    return {
        calc: difference
    }
}])