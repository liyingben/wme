//>>built
require({cache:{
'url:dijit/form/templates/VerticalSlider.html':"<table class=\"dijit dijitReset dijitSlider dijitSliderV\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconV\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td data-dojo-attach-point=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\"></td\r\n\t\t><td class=\"dijitReset dijitSliderDecorationC\" style=\"height:100%;\"\r\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><center class=\"dijitReset dijitSliderBarContainerV\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\r\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" data-dojo-attach-event=\"press:_onBarClick\"><!--#5629--></div\r\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" data-dojo-attach-event=\"press:_onBarClick\"\r\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableV\" style=\"vertical-align:top;\"\r\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleV\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td data-dojo-attach-point=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconV\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n></table>\r\n"}});
define("dijit/form/VerticalSlider", [
	"dojo/_base/declare", // declare
	"./HorizontalSlider",
	"dojo/text!./templates/VerticalSlider.html"
], function(declare, HorizontalSlider, template){

/*=====
	var HorizontalSlider = dijit.form.HorizontalSlider;
=====*/

	// module:
	//		dijit/form/VerticalSlider
	// summary:
	//		A form widget that allows one to select a value with a vertically draggable handle


	return declare("dijit.form.VerticalSlider", HorizontalSlider, {
		// summary:
		//		A form widget that allows one to select a value with a vertically draggable handle

		templateString: template,
		_mousePixelCoord: "pageY",
		_pixelCount: "h",
		_startingPixelCoord: "y",
		_handleOffsetCoord: "top",
		_progressPixelSize: "height",

		// _descending: Boolean
		//		Specifies if the slider values go from high-on-top (true), or low-on-top (false)
		//		TODO: expose this in 1.2 - the css progress/remaining bar classes need to be reversed
		_descending: true,

		_isReversed: function(){
			// summary:
			//		Overrides HorizontalSlider._isReversed.
			//		Indicates if values are high on top (with low numbers on the bottom).
			return this._descending;
		}
	});
});
