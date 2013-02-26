/*!
 * jQuery jumpMenu Plugin v1.0
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
	$.fn.jumpMenu = function(options) {
		
		function parseQuery(queryString) {
			var pairs = queryString.split('&'),
				keyValueObj = {},
				i,
				equalSignPosition;
			for (i in pairs) {
				equalSignPosition = pairs[i].indexOf('=');
				
				if (equalSignPosition == -1) {
					keyValueObj[pairs[i]] == '';
				} else {
					// set value equal to text after "=", and remove +'s
					keyValueObj[ pairs[i].substring(0, equalSignPosition) ] = decodeURIComponent(pairs[i].substr(equalSignPosition+1).replace(/\+/g, ' '));
				}
			}
			return keyValueObj;
		}

		return this.each(function() {
			var $this = $(this),
				settings = $.extend({
					'formSubmit': '',
					'clearParam': ''
				}, options),
				$formSubmit = $(settings.formSubmit);
			
			// Hide submit button
			if ($formSubmit) {
				$formSubmit.hide();
			}
				
			$this.change(function() {
				// First remove any beforeunload events that may be set up
				$(window).unbind('beforeunload');
				var val = $this.val(),
					$form = $this.parents('form');
				if (val != '') {
					// Preserve existing query string besides clearParam
					var queryString = decodeURI(location.search.substring(1));
					if (queryString != false || queryString != '') {
						var keyValueObj = parseQuery(queryString),
							key;
						for (key in keyValueObj) {
							if (key != $this.attr('name') && key != settings.clearParam) {
								$form.append('<input type="hidden" name="' + key + '" value="' + keyValueObj[key] + '" />');
							}
						}
					}
					
					$form.submit();
				}
			});
		});

	};
})(jQuery);