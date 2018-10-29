// 对象数组去重
export const removeObj = (data, id) => {
  for(let i = 0; i < data.length - 1; i++) {
    for(let j = i+1; j < data.length; j++) {
      if(data[i][id] === data[j][id]) {
        data.splice(j, 1)
        j = j-1
      }
    }
  }
}
// 去除一个数组中与另一个数组中的值相同的元素
export const  array_diff = (a, b) => {
  for(let i=0;i<b.length;i++)
  {
    for(let j=0;j<a.length;j++)
    {
      if(a[j] === b[i]){
        a.splice(j,1);
        j=j-1;
      }
    }
  }
}

// 判断手机号
export const checkPhone = (value) => {
  let reg = /^1[34578]\d{9}$/
  /*if(!(reg.test(value))){
    return {
      state:false,
      code:'',
      msg:'手机号输入不合法'
    }
  }else{
    return {
      state:true,
      code:'',
      msg:''
    }
  }*/
  return reg.test(value)
}
// 判断邮箱
export const checkEmail = (value) => {
  let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  /*if(!(reg.test(value))){
    return {
      state:false,
      code:'',
      msg:'邮箱输入不合法'
    }
  }else{
    return {
      state:true,
      code:'',
      msg:''
    }
  }*/
  return reg.test(value)
}

