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

function galleryRight() {
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
}

function galleryLeft() {
    image1++;
    image2++;
    image3++;
    if (image1 > images.length) {
        image1 = 0;
    }

    if (image2 > images.length) {
        image2 = 0;
    }

    if (image3 > images.length) {
        image3 = 0;
    }

    changeImg();
}

function changeImg() {
    gallImg1.src = `images/${images[image1]}.jpg`;
    gallImg2.src = `images/${images[image2]}.jpg`;
    gallImg3.src = `images/${images[image3]}.jpg`;
    console.log(`images/${images[image1]}.jpg`);
}