import styled from "styled-components";

export const PageArea = styled.div<{opacity: number}>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        height: var(--bs-card-height);
        word-wrap: break-word;
        background-color: var(--bs-card-bg);
        background-clip: border-box;
        border: var(--bs-card-border-width) solid var(--bs-card-border-color);
        border-radius: var(--bs-card-border-radius);
        box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06);
}

.mx-3 {
    margin-top: -1.5rem!important;
    margin-right: 1rem!important;
    margin-left: 1rem!important;
}

.border-radius-lg {
    border-radius: 0.5rem;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14),0 7px 10px -5px rgba(233,30,99,.4)!important;
    padding-right: 0.25rem!important;
    padding-top: 1.5rem!important;
    padding-bottom: 1.5rem!important;
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
    font-weight: 700!important;
    margin-top: 0.25rem!important;
}

.h4, .h5, .h6, h4, h5, h6 {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.375;
}

.text-white {
    color: #fff!important;
}
.mb-1 {
    margin-bottom: 0.25rem!important;
}
p {
    line-height: 1.625;
    font-weight: 300;
}

user agent stylesheet
p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.text-center {
    text-align: center!important;
}
.card .card-body {
    font-family: Roboto,Helvetica,Arial,sans-serif;
    padding: 1.5rem;
}
.pb-3 {
    padding-bottom: 1rem!important;
}
.card-body {
    flex: 1 1 auto;
    padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
    color: var(--bs-card-color);
}

.input-group.input-group-outline .form-label {
    display: flex;
    line-height: 3.925!important;
    top: -0.375rem;
    margin-bottom: 0;
}
.input-group .form-label {
    position: absolute;
    top: 0.6125rem;
    margin-left: 0;
    transition: all .2s ease;
}
.input-group label {
    transition: all .3s ease;
}
.form-label, label {
    font-size: .875rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: #7b809a;
    margin-left: 0.25rem;
}
.col-form-label, .form-label {
    font-weight: 400;
    color: #7b809a;
}
.form-label {
    margin-bottom: 0.5rem;
    font-size: .875rem;
}
.input-group.input-group-outline .form-control {
    background: none;
    border: 1px solid #d2d6da;
    border-radius: 0.375rem;
    border-top-left-radius: 0.375rem!important;
    border-bottom-left-radius: 0.375rem!important;
    padding: 0.625rem 0.75rem!important;
    line-height: 1.3!important;
}
.input-group>:not(:first-child):not(.dropdown-menu) {
    margin-left: 2px;
}
.input-group>.form-control, .input-group>.form-floating, .input-group>.form-select {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
}
.form-control {
    border: none;
}
.form-control {
    display: block;
    width: 100%;
    padding: 0.5rem 0;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: #495057;
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid #d2d6da;
    appearance: none;
    border-radius: 0.375rem;
    transition: .2s ease;
}
.input-group, .input-group .input-group-text {
    transition: .2s ease;
    border: none;
}
.input-group {
    border-radius: 0;
}
.mb-3 {
    margin-bottom: 1rem!important;
}
.input-group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
}
.form-check {
    display: block;
    min-height: auto;
    padding-left: 1.73em;
    margin-bottom: 0.125rem;
}
.bg-gradient-primary {
    background-image: linear-gradient(195deg,#ec407a,#d81b60);
}
.btn {
    margin-bottom: 1rem;
    letter-spacing: 0;
    background-size: 150%;
    background-position-x: 25%;
    position: relative;
    overflow: hidden;
    -webkit-appearance: none;
}
.badge, .btn {
    text-transform: uppercase;
}
.mb-0 {
    margin-bottom: 0!important;
}
.mt-4 {
    margin-top: 1.5rem!important;
}
.w-100 {
    width: 100%!important;
}
.btn {
    --bs-btn-padding-x: 1.5rem;
    --bs-btn-padding-y: 0.625rem;
    --bs-btn-font-size: 0.75rem;
    --bs-btn-font-weight: 700;
    --bs-btn-line-height: 1.667;
    --bs-btn-color: #7b809a;
    --bs-btn-bg: transparent;
    --bs-btn-border-width: 1px;
    --bs-btn-border-color: transparent;
    --bs-btn-border-radius: 0.5rem;
    --bs-btn-hover-border-color: transparent;
    --bs-btn-box-shadow: 0 4px 7px -1px rgba(0,0,0,.11),0 2px 4px -1px rgba(0,0,0,.07);
    --bs-btn-disabled-opacity: 0.65;
    --bs-btn-focus-box-shadow: 0 0 0 0.2rem rgba(var(--bs-btn-focus-shadow-rgb),.5);
    display: inline-block;
    padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
    font-family: var(--bs-btn-font-family);
    font-size: var(--bs-btn-font-size);
    font-weight: var(--bs-btn-font-weight);
    line-height: var(--bs-btn-line-height);
    color: var(--bs-btn-color);
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
    border-radius: var(--bs-btn-border-radius);
    background-color: var(--bs-btn-bg);
    transition: all .15s ease-in;
}
[type=button], [type=reset], [type=submit], button {
    -webkit-appearance: button;
}
.font-weight-bolder {
    font-weight: 700!important;
}
.text-dark {
    color: #344767!important;
}
a {
    letter-spacing: 0;
    color: #344767;
}
`