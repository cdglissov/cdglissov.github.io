import "../../node_modules/typed.js/dist/typed.umd.js"
import "./typedtext.js"
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import "../styles/styles.scss"

import {toggle, active} from './toggle_button.js'
import {typed} from "./typedtext.js"
import {onscroll, navbarScrolled, navbarToggler, checkResize, navbarCollapseAdjustTimer} from './navbar_utility.js'

// images. TODO: this is ugly create JS function to get all images and export
import personal_favicon from '.././assets/personal_favicon.ico'
import envelope_white from '../assets/envelope_white.svg'
import github_white from '../assets/github_white.svg'
import LinkedIn_white from '../assets/LinkedIn_white.svg'
import arrow from '../assets/arrow.png'
import python_png from '../assets/python.png'
import ext_link from '../assets/external_link_fa.svg'
import nyccov19 from '../assets/nyccov19.png'
import thesis from '../assets/thesis.png'
import danskparlament from '../assets/danskparlament.png'
import timeseries from '../assets/timeseries1.png'
import dataaug2 from '../assets/dataaug2.png'
import og_img from '../assets/og_image.png'

checkResize()
navbarToggler()
navbarCollapseAdjustTimer()
