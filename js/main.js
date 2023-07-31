let imgsarray = ["bg/bg5.jpg", "bg/bg4.jpg", "bg/bg3.jpg", "bg/bg2.jpg", "bg/bg1.jpg"];
let index = 0;
let interval;
let changeOption = true;
class data_background {
  constructor(index, option = true) {
    this.index = index;
    this.option = option;
  }
}
let localBG;
let jsonLocalBG;

// localStorage bullets
if (localStorage.getItem("bullets")) {
  let rep = localStorage.getItem("bullets");
  document.querySelectorAll(".settings-box .showohide span").forEach((span) => {
    span.classList.remove("active");
    if (span.dataset.bullets === rep) {
      span.classList.add("active");
    }
  });
  if (rep === "show") {
    document.querySelector(".bullets").style.display = "flex";
  } else {
    document.querySelector(".bullets").style.display = "none";
  }
}

// localStorage color
if (localStorage.getItem("data_color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("data_color")
  );
  document.querySelectorAll(".color_list li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === localStorage.getItem("data_color")) {
      li.classList.add("active");
    }
  });
}
// localStorage backgound
if (localStorage.getItem("data_background")) {
  localBG = JSON.parse(localStorage.getItem("data_background"));
  index = localBG.index;
  document.querySelector(
    ".landing"
  ).style.backgroundImage = `url(./image/${imgsarray[index]})`;
  changeOption = localBG.option;
  if (changeOption === false) {
    document
      .querySelectorAll(".settings-box .changeBG span")
      .forEach((span) => {
        span.classList.remove("active");
      });
    document
      .querySelector(".settings-box .changeBG span:nth-child(2)")
      .classList.add("active");
    document.querySelector(".settings-box .chosebg").style.display = "block";
  }
}

document
  .querySelectorAll(".settings-box .settings-container .option ul li")
  .forEach((li) => {
    li.addEventListener("click", (e) => {
      handelstat(e);
      document.documentElement.style.setProperty(
        "--main-color",
        e.target.dataset.color
      );
      localStorage.setItem("data_color", e.target.dataset.color);
    });
  });

// show setting
document.querySelector(".show-hide").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("show");
};

document.querySelectorAll(".all-content").forEach((elm) => {
  elm.addEventListener("click", () => {
    if (document.querySelector(".settings-box").classList.contains("show")) {
      document.querySelector(".settings-box").classList.remove("show");
      document.querySelector(".show-hide").classList.remove("fa-spin");
    }
  });
});

autoChangeBG();
// change bg option
let bgOption = document.querySelectorAll(".changeBG span");
bgOption.forEach((span) => {
  span.addEventListener("click", (e) => {
    // e.target.parentElement.querySelectorAll(".active").forEach((span) => {
    //   span.classList.remove("active");
    // });
    // e.target.classList.add("active");
    handelstat(e);
    if (e.target.dataset.background === "yes") {
      document.querySelector(".settings-box .chosebg").style.display = "none";
      changeOption = true;
      autoChangeBG();
      localBG = new data_background(index, changeOption);
      jsonLocalBG = JSON.stringify(localBG);
      localStorage.setItem("data_background", jsonLocalBG);
    } else {
      document.querySelector(".settings-box .chosebg").style.display = "block";
      clearInterval(interval);
      changeOption = false;
      localBG = new data_background(index, changeOption);
      jsonLocalBG = JSON.stringify(localBG);
      localStorage.setItem("data_background", jsonLocalBG);
    }
  });
});

// chose bg
let chosebefore = document.querySelector(
  ".settings-box .chosebg span:nth-child(1)"
);
let choseafter = document.querySelector(
  ".settings-box .chosebg span:nth-child(2)"
);
choseafter.addEventListener("click", () => {
  index++;
  index === imgsarray.length ? (index = 0) : (index = index);
  document.querySelector(
    ".landing"
  ).style.backgroundImage = `url(image/${imgsarray[index]})`;
  changeOption = false;
  localBG = new data_background(index, changeOption);
  jsonLocalBG = JSON.stringify(localBG);
  localStorage.setItem("data_background", jsonLocalBG);
});
chosebefore.addEventListener("click", () => {
  index--;
  index === -1 ? (index = imgsarray.length - 1) : (index = index);
  document.querySelector(
    ".landing"
  ).style.backgroundImage = `url(image/${imgsarray[index]})`;
  changeOption = false;
  localBG = new data_background(index, changeOption);
  jsonLocalBG = JSON.stringify(localBG);
  localStorage.setItem("data_background", jsonLocalBG);
});

// change bg
function autoChangeBG() {
  if (changeOption) {
    interval = setInterval(() => {
      document.querySelector(
        ".landing"
      ).style.backgroundImage = `url(image/${imgsarray[index]})`;
      localBG = new data_background(index, changeOption);
      jsonLocalBG = JSON.stringify(localBG);
      localStorage.setItem("data_background", jsonLocalBG);
      index++;
      index === imgsarray.length ? (index = 0) : (index = index);
    }, 5000);
  }
}

// show prog
let textLanding = document.querySelector(".landing .intro-text");
let skills = document.querySelector(".skills");
window.onscroll = function (element) {
  let skillsoffdsettop = skills.offsetTop; // she7al fo9 mn elemenr
  let skillsHight = skills.offsetHeight; //elemenet height
  let windonHeight = this.innerHeight; //window height
  let windowScrollToTop = this.scrollY; //sh7al scrolliti
  if (windowScrollToTop > skillsoffdsettop + skillsHight - windonHeight - 250) {
    document
      .querySelectorAll(".skills .container .progs .skill .prog span")
      .forEach((span) => {
        span.style.display = "block";
        span.style.width = span.dataset.prog;
      });
  }
  if (
    this.scrollY >
    document.querySelector(".about-us").offsetTop +
      document.querySelector(".about-us").offsetHeight -
      this.innerHeight -
      250
  ) {
    document.querySelector(".about-us .info-text").style.transform =
      "translate(0)";
    document.querySelector(".about-us .image-box").style.transform =
      "translate(0)";
  }
};

textLanding.style.transform = "translate(-80% ,-80%)";
// popup image
let images = document.querySelectorAll(".gallery .container .images-box img");

images.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.classList.add("gallery_overlay");
    document.body.appendChild(overlay);

    let image_box = document.createElement("div");
    let imgN = document.createElement("img");
    image_box.classList.add("target_image_box");
    imgN.src = img.src;
    image_box.appendChild(imgN);

    let heading = document.createElement("h3");
    heading.prepend(document.createTextNode(img.alt));
    image_box.prepend(heading);

    let close = document.createElement("span");
    close.appendChild(document.createTextNode("X"));
    close.classList.add("close");

    close.addEventListener("click", (e) => {
      if (e.target.classList.contains("close")) {
        e.target.parentElement.remove();
        document.querySelector(".gallery_overlay").remove();
      }
    });

    image_box.prepend(close);

    document.body.appendChild(image_box);
  });
});

// all move

// bullets

let allElement = document.querySelectorAll(".all-content > div");

allElement.forEach((elm) => {
  let bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.dataset.pos = `${elm.className}`;

  let div = document.createElement("div");
  div.appendChild(document.createTextNode(elm.className));

  bullet.appendChild(div);

  document.querySelector(".bullets").appendChild(bullet);
});

scrolltTota(document.querySelectorAll(".bullets .bullet"));
scrolltTota(document.querySelectorAll(".landing .header ul a"));
function scrolltTota(element) {
  element.forEach((elm) => {
    elm.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`.${e.target.dataset.pos}`).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  });
}

function handelstat(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((span) => {
    span.classList.remove("active");
  });
  e.target.classList.add("active");
}

document.querySelectorAll(".settings-box .showohide span").forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.bullets === "show") {
      document.querySelector(".bullets").style.display = "flex";
      localStorage.setItem("bullets", "show");
    } else {
      document.querySelector(".bullets").style.display = "none";
      localStorage.setItem("bullets", "hide");
    }
    handelstat(e);
  });
});

// reset
document.querySelector(".reset-button").onclick = function () {
  // localStorage.clear()
  localStorage.removeItem("bullets");
  localStorage.removeItem("data_color");
  localStorage.removeItem("data_background");
  window.location.reload();
};

document.querySelector(".header .toggle").onclick = function () {
  document.querySelector(".header ul").classList.toggle("show");
};

document.addEventListener("click",(e) => {
  if (
    e.target != document.querySelector(".header .toggle") &&
    e.target != document.querySelector(".header ul")
  ) {
    document.querySelector(".header ul").classList.remove("show");
  }
});

document.querySelector(".header ul").addEventListener("click", (e) => {
  e.stopPropagation();
});
document.querySelector(".header .toggle").addEventListener("click", (e) => {
  e.stopPropagation();
});
