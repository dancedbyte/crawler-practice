// 编写jquery.d.ts。即让ts能够识别js包中的语法。当然也可以去安装 @types/jquery
$(function() {
  $('body').html('<div>123</div>');
  new $.fn.init();
});
