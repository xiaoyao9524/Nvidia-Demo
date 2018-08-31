import "./scss/reset.scss";
import "./scss/index.scss";
import $ from 'jquery';

import onVideo from './video/metro-exodus-1152p-rtx-on.mp4';
import offVideo from './video/metro-exodus-1152p-rtx-off.mp4';

let videos = $('.video-item');
let interval = $('#video-wrapper .interval');
let off = videos.eq(0);
let on = videos.eq(1);
let videoLoadLen = 0;

let drag = interval.find('.arrow');
let offWrap = $('.video-item-wrapper').eq(0);
let left = 0;
let isDown = false;
let start = 0; // 按下的位置
let move = 0; // 鼠标移动的距离
let startMoveEnd = false; // 开头是否移动完成

interval.on('transitionend', function () {
  startMoveEnd = true;
  interval.css({transition: 'none'});
  left = interval.offset().left;
});

function changeWidth() {
  setTimeout(() => {
    let left = interval.offset().left;
    offWrap.css({width: left + move + 'px'});
    if (!startMoveEnd) {
      changeWidth();
    }
  }, 20)
}

on.on('canplaythrough', checkLoadLen);
off.on('canplaythrough', checkLoadLen);

function checkLoadLen() {
  if (videoLoadLen >= 2) {
    return;
  }
  videoLoadLen++;
  if (videoLoadLen === 2) {
    interval.addClass('interval-move');
    changeWidth();
    on.get(0).play();
    off.get(0).play();
    // on.trigger('play');
    // off.trigger('play');
  }
}
on.on('ended', checkEnd);
off.on('ended', checkEnd);

let endLen = 0;

function checkEnd() {
  endLen++;
  if (endLen === 2) {
    endLen = 0;
    changeWidth();
    on.trigger('play');
    off.trigger('play');
  }
}

on.attr('src', onVideo);
off.attr('src', offVideo);

// 拖拽部分
{
  drag.on('mousedown', function (ev) {
    if (!startMoveEnd) {return}
    interval.addClass('gray');
    isDown = true;
    start = ev.clientX;

  });
  $(document).on('mousemove', function (ev) {
    if (!startMoveEnd) {return}
    if (!isDown) {
      return
    }
    move = ev.clientX - start;
    interval.css({left: left + move + 'px'});
    offWrap.css({width: left + move + 'px'});
  });
  $(document).on('mouseup', function () {
    if (!startMoveEnd) {return}
    isDown = false;
    interval.removeClass('gray');
    start = 0;
    left = interval.offset().left;
  });
}
