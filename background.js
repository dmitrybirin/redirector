'use strict'

let redirectList = [
    {ruleName: "FB->messenger", urlContains:"facebook.com", redirectToUrl:"https://messenger.com"},
    {ruleName: "vk->edted", urlContains:"vk.com", redirectToUrl:"https://ed.ted.com"},
    {ruleName: "meduza->edted", urlContains:"meduza.io", redirectToUrl:"https://ed.ted.com"},
    ]

let notAllowedTransitionTypes = [
    "link", "typed", "generated", "keyword", "reload", "keyword_generated"
]
chrome.webNavigation.onCommitted.addListener(function(details){
    if (details.transitionQualifiers.includes('from_address_bar')
            || details.transitionQualifiers.includes('forward_back'))
    {
        if (notAllowedTransitionTypes.includes(details.transitionType) ){ 
            var currentRuleList = redirectList.filter((rule) => details.url.indexOf(rule.urlContains) !== -1)
            if (currentRuleList.length===1)
            {
                chrome.tabs.update({"url": currentRuleList[0].redirectToUrl});
            }
        }
    }
}, {url:redirectList.map((rule)=>Object.create({urlContains: rule.urlContains}))});
