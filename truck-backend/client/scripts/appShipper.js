

const url = 'http://localhost:8080/api/loads/';

(function($){
    $.fn.serializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // Skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // Adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // Push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // Fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // Named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);

console.log(" $( 'form' ).serializeArray() ");
const subBtn = document.querySelector('#submitBtn')
subBtn.addEventListener('click', async () => {
    // console.log(" $( 'form' ).serializeArray() ");
    console.log( $( 'form' ).serializeObject() );
    console.log(sessionStorage.getItem('jwt_token'))
    let formObject = $( 'form' ).serializeObject()
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('jwt_token'),
            },
            body: formObject
        });
        const result = await response.json();
        alert(result.message);
        if(result.message.includes('successfully')) {
            // window.location.replace('../index.html');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message)
    }
})