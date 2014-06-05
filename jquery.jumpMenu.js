/*!
 * jQuery jumpMenu Plugin v2.0
 * https://github.com/tjgupta/jQuery-jumpMenu-Plugin
 *
 * Copyright (c) Tim Gupta
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
;(function($) {
    $.fn.jumpMenu = function(formSubmit, options) {

        function parseQuery(queryString) {
            var pairs = queryString.split('&'),
                keyValueObj = {},
                keyValueSplit,
                value;
            $.each(pairs, function(i, pair) {
                keyValueSplit = pair.split('=');
                if (keyValueSplit.length === 2) {
                    value = decodeURIComponent(keyValueSplit[1]).replace(/\+/g, ' ');
                } else {
                    value = '';
                }
                keyValueObj[keyValueSplit[0]] = value;
            });
            return keyValueObj;
        }

        return this.each(function() {
            var $this = $(this),
                settings = $.extend({
                    'clearParam': ''
                }, options),
                $formSubmit = $(settings.formSubmit);

            // Hide submit button
            if ($formSubmit) {
                $formSubmit.hide();
            }

            $this.change(function() {
                // First remove any beforeunload events that may be set up
                var val = $this.val(),
                    $form = $this.closest('form'),
                    queryString,
                    keyValueObj,
                    $input;
                $(window).unbind('beforeunload');
                if (val !== '') {
                    // Preserve existing query string besides clearParam
                    queryString = decodeURI(location.search.substring(1));
                    if (queryString !== false || queryString !== '') {
                        keyValueObj = parseQuery(queryString);
                        $.each(keyValueObj, function(key, value) {
                            // add hidden var to form for submit if it's not the select name or the
                            // parameter we want to clear
                            if (key !== $this.attr('name') && key !== settings.clearParam) {
                                $input = $('<input type="hidden"/>').attr('name', key).val(value);
                                $form.append($input);
                            }
                        });
                    }

                    $form.submit();
                }
            });
        });

    };
})(jQuery);
