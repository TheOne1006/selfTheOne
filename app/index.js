/**
 * Application entry point
 */

// Load application styles
import 'fullpage.js/dist/jquery.fullpage.min.css';
import 'google-code-prettify/bin/prettify.min';
import 'fullpage.js/dist/jquery.fullpage.min';
import Vivus from 'vivus/dist/vivus';

import '../assets/styles/index.scss';
import treeSvg from '../assets/svgs/tree/tree.svg';
// ================================
// START YOUR APP HERE
// ================================
$(window.document).ready(() => {
  const animateHooks = {
    // 展示
    bottom: 'moveUp',
    top: 'moveDown',
    left: 'moveRight',
    right: 'moveLeft',
    topLeft: 'moveDownRight',
    bottomLeft: 'moveUpRight',
    topRight: 'moveDownLeft',
    bottomRight: 'moveUpLeft',
  };

  // 是否为移动设备
  const isMobile = window.navigator.userAgent.match(/mobile/i);
  // 缓存图片数据
  const svgImgs = {
    sectionAll: $('#sectionAll .svgimg'),
    sectionInfo: $('#sectionInfo .svgimg'),
    welcomeTop: $('.welcome-top'),
    welcomeBottom: $('.welcome-bottom'),
  };

  // 初始化
  svgImgs.sectionAll.addClass(function addClass() {
    return animateHooks[$(this).data('animate')];
  });

  window.prettyPrint();

  const vivusTheOne = new Vivus('vivusTheOne', {
    type: 'scenario-sync',
    duration: 10,
    start: 'autostart',
    dashGap: 10,
    forceRender: false,
  });
  $('#vivusTheOne').click(() => {
    vivusTheOne.reset().play();
  });

  let vivusTree;
  function treePlay() {
    if (!vivusTree) {
      vivusTree = new Vivus('tree', {
        type: 'scenario',
        file: treeSvg,
      });

      // hack 加载进度
      setTimeout(() => {
        vivusTree.reset().play();
      }, 2000);
    } else {
      vivusTree.reset().play();
    }
  }

  // fullpage
  $('#fullpage').fullpage({
    // 在复杂情况下还是会失效
    // sectionsColor: ['#563d7c' ,'#5bc0de','#5cb85c','#f0ad4e','#d9534f'],
    anchors: ['all', 'page2', 'page3', 'page4'],
    // 移动设备启用css3
    css3: isMobile,
    controlArrows: !isMobile,
    verticalCentered: false,
    animateAnchor: true,
    recordHistory: true,
    afterRender: () => {
      // 渲染完成
      setTimeout(() => {
        svgImgs.sectionAll.removeClass(function removeClass() {
          return animateHooks[$(this).data('animate')];
        });
      }, 500);
    },
    onLeave: (index, nextIndex) => {
      switch (index) {
        case 1:
          $('#staticLogo').addClass('active');

          svgImgs.sectionAll.addClass(function addClass() {
            return animateHooks[$(this).data('animate')];
          });
          break;
        case 2:
          if (!isMobile) {
            svgImgs.sectionInfo.removeClass('flashAndtada');
          }
          break;
        case 3:
          svgImgs.welcomeBottom.removeClass('welcome-animate-bottom');
          svgImgs.welcomeTop.removeClass('welcome-animate-top');
          break;
        default:
          // treePlay('rewind');
          break;

      }

      switch (nextIndex) {
        case 1:
          $('#staticLogo').removeClass('active');
          svgImgs.sectionAll.removeClass(function removeClass() {
            return animateHooks[$(this).data('animate')];
          });
          break;
        case 2:
          if (!isMobile) {
            svgImgs.sectionInfo.addClass('flashAndtada');
          }
          break;
        case 3:
          setTimeout(() => {
            svgImgs.welcomeBottom.addClass('welcome-animate-bottom');
            svgImgs.welcomeTop.addClass('welcome-animate-top');
          }, 800);
          break;
        case 4:
          $('#tree').show();
          treePlay();
          break;
        default:
          break;
      }
    },
  });
});
