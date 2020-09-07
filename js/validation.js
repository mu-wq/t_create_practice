$(document).ready(function(){

  console.log(regEmail);

  $("#container").hide();
  //$("#switcher").themeswitcher();

  $("#clickForm").click(function(){
    $("#container").attr('title','Registration Form').dialog({
      buttons:[
        {
          text: "キャンセル",
          click: function(){
            $( this ).dialog( "close" );
          }
        },
        {
          text: "確認する",
          click: function(){
            var inputItems = $('#confirmArea').find('input');
            var tmp;
            var inputValues = $('#customForm').find('input');
            for(i = 0; i < inputItems.length; i++){
              var arrForInsertVls = [];
              //console.log(inputItems[i]);
              //arr2[i] = inputItems[i].name;
              tmp = String(inputItems[i].name).replace('c_', '');
              if((tmp === 'sex') || (tmp ==='studyFor')){

                  //console.log(tmp);
                  var c = 'document.customForm.' + tmp;
                  console.log(c);
                  c = eval(c);
                  console.log(c);
                  for(i = 0; i < c.length; i++){
                    if(c[i].checked){
                      console.log(true);
                      console.log(c[i].value);
                      arrForInsertVls.push(c[i].value);
                    }else{
                      console.log(false);
                    }
                  }
                  console.log(arrForInsertVls);
                  var str = arrForInsertVls.join(',');
                  console.log(str);
                  inputItems[i].value = str;

              }else{
                console.log(tmp);
                if(document.getElementById(tmp).value === undefined){
                  console.log("a");
                }else{
                  console.log(tmp);
                  inputItems[i].value = document.getElementById(tmp).value;
                }
              }
            }
            //console.log(arr2);
            //targetElement.insertAdjacentElement(beforeend, element);
            if(validateName() && katakaneCheck() && validateEmail() && validateDate()){
              $('#confirmArea').show();
              $('#nextDiv').show();
              $('#clickForm').val('修正する');
              $( this ).dialog( "close" );
            } else{
              alert("入力内容に不備があります");
            }
          }
        }
      ],
      title: "無料体験予約",
      width: 550,
      closeOnEscape: false,
      draggable: false,
      resizable: false,
      show: 'fade',
      modal: true,
      dialogClass: 'modalForRegister',
      position: {
        my: 'center top',
        at: 'center top',
        of: 'body'
      }
    });
  });

  var form = $("#custmonForm");
  var name = $("#name");
  var nameInfo = $("#nameInfo");
  var kanaName = $("#kanaName");
  var kanaNameInfo = $("#kanaNameInfo");
  var email = $("#email");
  var emailInfo = $("#emailInfo");
  var date = $("#datepicker");
  var dateInfo = $("#datepickerInfo");
  var pass1 = $("#pass1");
  var pass1Info = $("#pass1Info");
  var pass2 = $("#pass2");
  var pass2Info = $("#pass2Info");
  var state = false;

  name.change(validateName);
  kanaName.change(katakaneCheck);
  email.change(validateEmail);
  date.change(validateDate);
  pass1.change(validatePass1);
  pass2.change(validatePass2);

  function validateName(){
    if(name.val().length < 2){
      name.removeClass("valid");
      nameInfo.removeClass("valid");
      name.addClass("error");
      nameInfo.addClass("error");
      nameInfo.text("２文字以上で入力してください");
      state = false;
    }
    else{
      var uname = name.val();
      //$.post("validate.php", {"name": uname}, function(data){
        if(data != 1){
          name.removeClass("valid");
          nameInfo.removeClass("valid");
          name.addClass("error");
          nameInfo.addClass("error");
          nameInfo.text("This name is already registered.");
          state = false;
        }
        else{
          name.removeClass("error");
          nameInfo.removeClass("error");
          name.addClass("valid");
          nameInfo.addClass("valid");
          nameInfo.text("OK!");
          state = true;
        }
      //});
    }
    return state;
  }

  function katakaneCheck(){
    console.log("a");
    var s = kanaName.val();
    if(s === ''){
      kanaName.removeClass("valid");
      kanaNameInfo.removeClass("valid");
      kanaName.addClass("error");
      kanaNameInfo.addClass("error");
      kanaNameInfo.text("全角カタカナで入力してください");
      state = false;
    }else{
      if(!!s.match(/^[ァ-ヶー　]*$/)){
        kanaName.removeClass("error");
        kanaNameInfo.removeClass("error");
        kanaName.addClass("valid");
        kanaNameInfo.addClass("valid");
        kanaNameInfo.text("OK!");
        state = true;
      }else{
        kanaName.removeClass("valid");
        kanaNameInfo.removeClass("valid");
        kanaName.addClass("error");
        kanaNameInfo.addClass("error");
        kanaNameInfo.text("全角カタカナで入力してください");
        state = false;
      }
    }
    return state;
  }

  function validateEmail(){
    var s = email.val();
    if(s === ''){
      console.log("a");
      email.removeClass("valid");
      emailInfo.removeClass("valid");
      email.addClass("error");
      emailInfo.addClass("error");
      emailInfo.text("正しく入力してください");
      state = false;
    }else{
      if(!!s.match(regEmail)){
        console.log("b");
        email.removeClass("error");
        emailInfo.removeClass("error");
        email.addClass("valid");
        emailInfo.addClass("valid");
        emailInfo.text("OK!");
        state = true;
      }else{
        console.log("c");
        email.removeClass("valid");
        emailInfo.removeClass("valid");
        email.addClass("error");
        emailInfo.addClass("error");
        emailInfo.text("正しく入力してください");
        state = false;
      }
    }
    return state;
  }

  function validateDate(){
    var s = date.val();
    if(s === ''){
      console.log("a");
      date.removeClass("valid");
      dateInfo.removeClass("valid");
      date.addClass("error");
      dateInfo.addClass("error");
      dateInfo.text("ご希望の日時を入力してください");
      state = false;
    }else{
      console.log("b");
      date.removeClass("error");
      dateInfo.removeClass("error");
      date.addClass("valid");
      dateInfo.addClass("valid");
      dateInfo.text("OK!");
      state = true;
    }
    return state;
  }

  function validatePass1(){
    if(pass1.val().length < 5){
      pass1.removeClass("valid");
      pass1Info.removeClass("valid");
      pass1.addClass("error");
      pass1Info.addClass("error");
      pass1Info.text("Password must have at least 5 char");
      state = false;
    }
    else{
      pass1.removeClass("error");
      pass1Info.removeClass("error");
      pass1.addClass("valid");
      pass1Info.addClass("valid");
      pass1Info.text("OK.");
      state = true;
    }
    if(pass2.val()){
      validatePass2();
    }
    return state;
  }

  function validatePass2(){
    if(pass2.val()!= pass1.val()){
      pass2.removeClass("valid");
      pass2Info.removeClass("valid");
      pass2.addClass("error");
      pass2Info.addClass("error");
      pass2Info.text("Password2 is incorrect with Password1");
      state = false;
    }
    else{
      pass2.removeClass("error");
      pass2Info.removeClass("error");
      pass2.addClass("valid");
      pass2Info.addClass("valid");
      pass2Info.text("OK.");
      state = true;
    }
    return state;
  }

  $("#send").click(function(){
    var all = $("form").serialize();
    if(validateName() && validateEmail() && validatePass1() && validatePass2()){
      $.ajax({
        type: "POST",
        url: "insert.php",
        data: all,
        success: function(data){
          if(data != 0){
            alert("you have success!");
          }
          else{
            alert("you have misstake!");
          }
        }
      });
    }
    else{
      alert("there are some error");
    }
  });

  $("#next").click(function(){
    $("#overlay").show();
    setTimeout("location.href='done.html';",500);
  });

});
