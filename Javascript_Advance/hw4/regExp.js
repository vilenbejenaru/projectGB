'use strict';

let text =
    "Lorem, 'ipsum' dolor si't amet consectetur 'adipisicing elit.' Incidunt nemo reiciendis 'quaerat necessitatibus' 'tempore'. Obcaecati blanditiis repudiandae reprehenderit eum at nulla, facilis dolorum 'nesciunt facere autem' laboriosam molestias exercitationem'.' Cupiditate 'explicabo' consequuntur laudantium 'eligendi totam. Dolores' 'ea' voluptatum quibusdam nostrum!";

let regexp = /'/g;
let regexp2 = /' /g;
let regexp21 = / '/g;
let text2 = text;
text = text.replace(regexp, '"');
console.log(text);

text2 = text2.replace(regexp2, '" ');
text2 = text2.replace(regexp21, ' "');
console.log(text2);
