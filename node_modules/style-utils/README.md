# style-utils

tween-one 和 scroll-anim, queue-anim 的样式

color 和 transform 的分解..
 
### mergeStyle(current, change)

mergeStyle('translate(30px,50em)', 'translateY(20em)') => translate(30px, 20em)

### getParam(current, change, data)

getParam('rotateX(30deg)', 'rotateX(100deg)', 40) => rotateX(40deg)

懒得写,,反正自用....