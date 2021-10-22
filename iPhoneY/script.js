// Images
var images = [
    "lens1", "lens2", "phone1", "phone2",
    "phone3", "phoneCamera"
];

// Default images
var image1 = 2;
var image2 = 3;
var image3 = 4;

var gallImg1 = document.getElementById("gallImg1");
var gallImg2 = document.getElementById("gallImg2");
var gallImg3 = document.getElementById("gallImg3");

function galleryRight(obj) {
    obj.disabled = true;
    image1++;
    image2++;
    image3++;
    if (image1 > images.length - 1) {
        image1 = 0;
    }

    if (image2 > images.length - 1) {
        image2 = 0;
    }

    if (image3 > images.length - 1) {
        image3 = 0;
    }

    changeImg();
    obj.disabled = false;
}

function galleryLeft(obj) {
    obj.disabled = true;

    image1--;
    image2--;
    image3--;

    if (image1 < 0) {
        image1 = images.length - 1;
    }

    if (image2 < 0) {
        image2 = images.length - 1;
    }

    if (image3 < 0) {
        image3 = images.length - 1;
    }

    changeImg();
    obj.disabled = false;
}

function changeImg() {
    gallImg1.src = `images/${images[image1]}.jpg`;
    gallImg2.src = `images/${images[image2]}.jpg`;
    gallImg3.src = `images/${images[image3]}.jpg`;
}