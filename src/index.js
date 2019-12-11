import 'bootstrap';
import './style.scss';

var mySlider = document.getElementsByClassName("my-slider")[0];
var myItems = document.getElementsByClassName("my-items")[0];
var myItemsContainer = mySlider.getElementsByClassName("items-container")[0];
var myButtonToLeft = mySlider.querySelector(".slider-arrow.left");
var myButtonToRight = mySlider.querySelector(".slider-arrow.right");
addMySliderEffect(myItems, myItemsContainer, myButtonToLeft, myButtonToRight);

function addMySliderEffect(container, itemsContainer, left, right) {
  left.addEventListener("click", function() {
    slideOnEvent(container, "left", itemsContainer, left);
  })
  right.addEventListener("click", function() {
    slideOnEvent(container, "right", itemsContainer, right);
  })
}

function slideOnEvent(container, direction, itemsContainer, button) {
  var clonedContainer = container.cloneNode(true);
  var allItems = itemsContainer.querySelectorAll(".item");
  var clonedAllItems = clonedContainer.querySelectorAll(".item");
  for (var i = 0; i < allItems.length; i++) {
    if (direction === "right") {
      allItems[i].replaceWith(clonedAllItems[mod(i - 1, allItems.length)]);
    } else if (direction === "left") {
      allItems[i].replaceWith(clonedAllItems[mod(i + 1, allItems.length)]);
    }
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

var slider = document.getElementsByClassName("slider")[0];

var items = document.getElementsByClassName("items")[0];
var itemsContainer = slider.getElementsByClassName("items-container")[0];
var buttonToLeft = slider.querySelector(".slider-arrow.left");
var buttonToRight = slider.querySelector(".slider-arrow.right");
addSliderEffect(items, itemsContainer, buttonToLeft, buttonToRight);

function addSliderEffect(container, itemsContainer, left, right) {
  left.addEventListener("click", function() {
    slide(container, "left", itemsContainer, left);
  })
  right.addEventListener("click", function() {
    slide(container, "right", itemsContainer, right);
  })
}

function slide(container, direction, itemsContainer, button) {
  var slideWrapper = container.getElementsByClassName("slide-items-wrapper")[0];
  var sliderItemsFilter = container.getElementsByClassName("slider-items-filter")[0];
  if (slideWrapper.children.length > 1)
    slideWrapper.removeChild(slideWrapper.lastChild);
  var itemsCloned = itemsContainer.cloneNode(true);

  slideWrapper.style.overflow = "hidden";
  button.style.pointerEvents = "none";
  sliderItemsFilter.style.boxShadow = "inset 175px 0 30px -110px #ffffff, inset -175px 0 30px -110px #ffffff";
  sliderItemsFilter.style.pointerEvents = "auto";

  setAsideItemsCloneForSlider(itemsCloned, direction);

  slideWrapper.appendChild(itemsCloned).focus();

  itemsCloned.style.transition = "transform 0.6s ease-in-out";
  itemsContainer.style.transition = "transform 0.6s ease-in-out";

  setSlidersContainersTransformByDirection(itemsCloned, itemsContainer, direction);

  setTimeout(function() {
    var itemNodeList = itemsCloned.getElementsByClassName("item");
    clearNodesExceptFromBeginning(itemsContainer, 0);

    changeItemsMainContNotMobile(itemNodeList, direction, itemsContainer);

    slideWrapper.removeChild(itemsCloned);
    itemsContainer.style.transition = "none";
    itemsContainer.style.transform = "translateX(0)";

    button.style.pointerEvents = "auto";

    slideWrapper.style.overflow = "visible";
    sliderItemsFilter.style.boxShadow = "none";
    sliderItemsFilter.style.pointerEvents = "none";
  }, 600)
}

function changeItemsMainContNotMobile(itemNodeList, direction, itemsContainer) {
  Array.from(itemNodeList).forEach(function(element, index) {
      if (direction === "left")
        var copyItem = itemNodeList[mod((index + 1),itemNodeList.length)].cloneNode(true);
      else if (direction === "right")
        var copyItem = itemNodeList[mod((index - 1),itemNodeList.length)].cloneNode(true);
    itemsContainer.appendChild(copyItem);
  })
}

function setSlidersContainersTransformByDirection(itemsCloned, itemsContainer, direction) {
  if (direction === "right") {
      itemsCloned.style.transform = "translateX(-" + (100 / itemsContainer.children.length * (itemsContainer.children.length - 1)) + "%)";
      itemsContainer.style.transform = "translateX(" + (100 / itemsContainer.children.length) + "%)";
  }
  else if (direction === "left") {
      itemsCloned.style.transform = "translateX(" + (100 / itemsContainer.children.length * (itemsContainer.children.length - 1)) + "%)";
      itemsContainer.style.transform = "translateX(-" + (100 / itemsContainer.children.length) + "%)";
  }
}

function setAsideItemsCloneForSlider(itemsCloned, direction) {
  itemsCloned.style.position = "absolute";
  itemsCloned.style.left = "0";
  itemsCloned.style.right = "0";
  itemsCloned.style.top = "0";
  itemsCloned.style.bottom = "0";

  if (direction === "right")
    itemsCloned.style.transform = "translateX(-100%)";
  else if (direction === "left")
    itemsCloned.style.transform = "translateX(100%)";
}

function clearNodesExceptFromBeginning(parentNode, childsToLeave) {
  while (parentNode.children.length > childsToLeave) {
    parentNode.removeChild(parentNode.firstChild);
  }
}
