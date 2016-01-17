
var domain = '<%=domain%>'
var links = document.getElementsByTagName('a')
var images = document.getElementsByTagName('img')
var forms = document.getElementsByTagName('form')

for(var i=0;i<links.length;i++)
{
    !function(item){
        item.onclick= function(){
            var url = item.href.replace('http://127.0.0.1:8088', '')
            // alert(item.href.replace('http://127.0.0.1:8088', ''))
            if( url.indexOf('/') !==0 ){
                item.href = 'http://127.0.0.1:8088/web?domain=' + domain + '&url=' + url
            }
            
        //     else if(url.indexOf('/')===0){
        //         alert('http://127.0.0.1:8088/web?url=' + domain   + url)
        //         //item.href = 'http://127.0.0.1:8088/web?url=' + item.href
        //     }
        // }
    }(links[i])
}

// for(var i =0;i<images.length;i++)
// {
//     var url = images[i].src.replace('http://127.0.0.1:8088', '')

//     if( url.indexOf('/') !==0 ){
//         images[i].src = 'http://127.0.0.1:8088/image?url=' + url
//     }
    
//     else if(url.indexOf('/')===0){
//         images[i].src = 'http://127.0.0.1:8088/image?url=' + domain   + url
//     }
// }
// for(var i =0;i<forms.length;i++)
// {
    
//     !function(item){
//         item.onsubmit= function(){
//             alert(item.action)
//             // var url = item.href.replace('http://127.0.0.1:8088', '')
//             // // alert(item.href.replace('http://127.0.0.1:8088', ''))
//             // if( url.indexOf('/') !==0 ){
//             //     item.href = 'http://127.0.0.1:8088/web?domain=' + domain + '&url=' + url
//             // }
            
//             // else if(url.indexOf('/')===0){
//             //     alert('http://127.0.0.1:8088/web?url=' + domain   + url)
//             //     //item.href = 'http://127.0.0.1:8088/web?url=' + item.href
//             // }
//         }
//     }(forms[i])
    
//     // return 
//     // var url = forms[i].action.replace('http://127.0.0.1:8088', '')
//     // if( url.indexOf('/') !==0 ){
//     //     forms[i].action = 'http://127.0.0.1:8088/web?url=' + url
//     // }
    
//     // else if(url.indexOf('/')===0){
//     //     alert('http://127.0.0.1:8088/web?url=' + domain   + url)
//     //     forms[i].action = 'http://127.0.0.1:8088/web?url=' + domain   + url
//     // }
// }




// // console.log(link)
