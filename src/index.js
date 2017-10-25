'use strict'

import vueEventCalendar from './vue-event-calendar.vue'

function install (Vue, options = {}) {
  const isVueNext = Vue.version.split('.')[0] === '2'
  const inBrowser = typeof window !== 'undefined'
  let dateObj = new Date()
  const DEFAULT_OPTION = {
    locale: 'ru', // en
    color: ' #f29543',
    className:'selected-day',
    weekStartOn: 0 // 0 mean sunday
  }
  let Calendar = {
    $vm: null,
    bindEventBus (vm) {
      this.$vm = vm
    },
    toDate (dateString) {
      if (dateString === 'all') {
        this.$vm.CALENDAR_EVENTS_DATA.params = {
          curYear: dateObj.getFullYear(),
          curMonth: dateObj.getMonth(),
          curDate: dateObj.getDate(),
          curEventsDate: 'all'
        }
      } else {
        let dateArr = dateString.split('/')
        dateArr = dateArr.map((item) => {
          return parseInt(item, 10)
        })
        this.$vm.CALENDAR_EVENTS_DATA.params = {
          curYear: dateArr[0],
          curMonth: dateArr[1]-1,
          curDate: dateArr[2],
          curEventsDate: dateString
        }
      }
    },
    nextMonth () {
      if (this.$vm.CALENDAR_EVENTS_DATA.params.curMonth < 11) {
        this.$vm.CALENDAR_EVENTS_DATA.params.curMonth++
      } else {
        this.$vm.CALENDAR_EVENTS_DATA.params.curYear++
        this.$vm.CALENDAR_EVENTS_DATA.params.curMonth = 0
      }
    },
    preMonth () {
      if (this.$vm.CALENDAR_EVENTS_DATA.params.curMonth > 0) {
        this.$vm.CALENDAR_EVENTS_DATA.params.curMonth--
      } else {
        this.$vm.CALENDAR_EVENTS_DATA.params.curYear--
        this.$vm.CALENDAR_EVENTS_DATA.params.curMonth = 11
      }
    }
  }
  
  if (!Object.assign) {
	  Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function(target) {
		  'use strict';
		  if (target === undefined || target === null) {
			throw new TypeError('Cannot convert first argument to object');
		  }

		  var to = Object(target);
		  for (var i = 1; i < arguments.length; i++) {
			var nextSource = arguments[i];
			if (nextSource === undefined || nextSource === null) {
			  continue;
			}
			nextSource = Object(nextSource);

			var keysArray = Object.keys(Object(nextSource));
			for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
			  var nextKey = keysArray[nextIndex];
			  var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
			  if (desc !== undefined && desc.enumerable) {
				to[nextKey] = nextSource[nextKey];
			  }
			}
		  }
		  return to;
		}
	  });
	}

  const calendarOptions = Object.assign(DEFAULT_OPTION, options)

  

  const VueCalendarBarEventBus = new Vue({
    data: {
      CALENDAR_EVENTS_DATA: {
        options: calendarOptions,
        params: {
          curYear: dateObj.getFullYear(),
          curMonth: dateObj.getMonth(),
          curDate: dateObj.getDate(),
          curEventsDate: 'all'
        }
      }
    }
  })

  if (inBrowser) {
    window.VueCalendarBarEventBus = VueCalendarBarEventBus
    Calendar.bindEventBus(VueCalendarBarEventBus)
  }

  Vue.component('vue-event-calendar', vueEventCalendar)

  Vue.prototype.$EventCalendar = Calendar
}

export default install

if (typeof module === 'object' && module.exports) {
  module.exports.install = install
}
