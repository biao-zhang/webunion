
<script>
  const msu_url ='http://192.168.10.217:8080/midservice/api'; // 前台地址
  const msa_url ='http://192.168.10.218:8080/midservice/api'; // 后台地址
  const file_url = 'http://192.168.10.217:8093/fileservice/api'; // 图片请求地址
  const captchaImage = msu_url + '/sc/captcha/image'; // 前台获取验证码地址
  const admincaptchaImage = msa_url + '/sc/captcha/image'; // 后台获取验证码地址
  const file_imgSrc = file_url + '/file/download?path=';//图片获取地址

  export default {
    file_imgSrc,
    captchaImage,
    admincaptchaImage,
    msu_url,
    msa_url,
    file_url,
  }
</script>


