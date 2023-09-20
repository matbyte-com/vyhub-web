<template>
  <div class="sa">
    <div class="sa-error">
      <div class="sa-error-x">
        <div class="sa-error-left"></div>
        <div class="sa-error-right"></div>
      </div>
      <div class="sa-error-placeholder"></div>
      <div class="sa-error-fix"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorIcon',
};
</script>

<style scoped lang="scss">
.sa {
  width: 140px;
  height: 140px;
  padding: 26px;
&-error {
   border-radius: 50%;
   border: 4px solid #F27474;
   box-sizing: content-box;
   height: 80px;
   padding: 0;
   position: relative;
   width: 80px;
   animation: animateErrorIcon .5s;
&:after, &:before {
            content: '';
            height: 120px;
            position: absolute;
            transform: rotate(45deg);
            width: 60px;
          }
&:before {
   border-radius: 40px 0 0 40px;
   width: 26px;
   height: 80px;
   top: -17px;
   left: 5px;
   transform-origin: 60px 60px;
   transform: rotate(-45deg);
 }
&:after {
   border-radius: 0 120px 120px 0;
   left: 30px;
   top: -11px;
   transform-origin: 0 60px;
   transform: rotate(-45deg);
   animation: rotatePlaceholder 4.25s ease-in;
 }
&-x {
   display: block;
   position: relative;
   z-index: 2;
 }
&-placeholder {
   border-radius: 50%;
   border: 4px solid rgba(200, 0, 0, .2);
   box-sizing: content-box;
   height: 80px;
   left: -4px;
   position: absolute;
   top: -4px;
   width: 80px;
   z-index: 2;
 }
&-fix {
   height: 90px;
   left: 28px;
   position: absolute;
   top: 8px;
   transform: rotate(-45deg);
   width: 5px;
   z-index: 1;
 }
&-left, &-right {
           border-radius: 2px;
           display: block;
           height: 5px;
           position: absolute;
           z-index: 2;
           background-color: #F27474;
           top: 37px;
           width: 47px;
         }
&-left {
   left: 17px;
   transform: rotate(45deg);
   animation: animateXLeft .75s;
 }
&-right {
   right: 16px;
   transform: rotate(-45deg);
   animation: animateXRight .75s;
 }
}
}
@keyframes rotatePlaceholder {
  0%, 5% {
    transform: rotate(-45deg);
  }
  100%,12% {
    transform: rotate(-405deg);
  }
}
@keyframes animateErrorIcon {
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}
@keyframes animateXLeft {
  0%, 65% {
    left: 82px;
    top: 95px;
    width: 0;
  }
  84% {
    left: 14px;
    top: 33px;
    width: 47px;
  }
  100% {
    left: 17px;
    top: 37px;
    width: 47px;
  }
}
@keyframes animateXRight {
  0%, 65% {
    right: 82px;
    top: 95px;
    width: 0;
  }
  84% {
    right: 14px;
    top: 33px;
    width: 47px;
  }
  100% {
    right: 16px;
    top: 37px;
    width: 47px;
  }
}

</style>
