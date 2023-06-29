const creativeSource = String.raw`<script type="text/adtag"><script type="text/javascript" src="https://as.jivox.com/unit/unit_renderer.php?es_pId=ecaa37f&showAdChoices=1&isDynamic=1&campaignId=169568&gdpr_consent=\${GDPR_CONSENT_294}&dspId=MediaMath&bDim=300x250&jvxVer=2&gdpr=\${GDPR}&bUnitId=2000&ap_DataSignal3=[CONTEXTUAL.SELF]&ap_DataSignal2=[BID_ATTR.bid_id]&r=[RANDOM_NUMBER]&cMacro=[ENCODED_CLICK_REDIRECT]&ap_DataSignal4=[SEGMENT.PAID]&ap_DataSignal7=[BID_ATTR.exchange_id]&ap_DataSignal9=[AD_ATTR.creative]|[AD_ATTR.strategy]&ap_DataSignal8=[MM_UUID]&us_privacy=\${US_PRIVACY}&ts_pId=ecaa37f&siteId=4269c95f27d4482&creativeUnitType=20"></scr+ipt></script><script language="javascript" type="text/javascript" src="https://cdn.doubleverify.com/dvbs_src.js?ctx=589953&cmp=169568&plc=ecaa37f&sid=4269c95f27d4482&aufilter1=[AD_ATTR.advertiser]&prr=1&ppid=104&autt=1&auevent=[BID_ATTR.bid_id]&aubndl=[BID_ATTR.app_id]&auip=[BID_ATTR.ip]&audeal=[BID_ATTR.pmp_mm_deal_id]&auadv=[AD_ATTR.advertiser]&aucmp=[AD_ATTR.campaign]&c1=[AD_ATTR.strategy]&aucrtv=[AD_ATTR.creative]&c2=[BID_ATTR.exchange]&auxch=[BID_ATTR.exchange_id]&pltfrm=[BID_ATTR.pub_id]&ausite=[BID_ATTR.site_id]&turl=[BID_ATTR.page_url]&DVPX_PP_AUCTION_UA=[BID_ATTR.user_agent]&dvregion=0&unit=300x250"></script><script src='https://cdn.doubleverify.com/dvtp_src.js#ctx=3397726&cmp=3506043&sid=pp04&plc=35060431&advid=3398311&adsrv=27&btreg=&btadsrv=&tagtype=&dvtagver=6.1.src&aufilter1=[AD_ATTR.advertiser]&prr=1&ppid=104&autt=1&auevent=[BID_ATTR.bid_id]&aubndl=[BID_ATTR.app_id]&auip=[BID_ATTR.ip]&audeal=[BID_ATTR.pmp_mm_deal_id]&auadv=[AD_ATTR.advertiser]&aucmp=[AD_ATTR.campaign]&c1=[AD_ATTR.strategy]&aucrtv=[AD_ATTR.creative]&c2=[BID_ATTR.exchange]&auxch=[BID_ATTR.exchange_id]&pltfrm=[BID_ATTR.pub_id]&ausite=[BID_ATTR.site_id]&turl=[BID_ATTR.page_url]&DVPX_PP_AUCTION_UA=[BID_ATTR.user_agent]' type='text/javascript'></script>`;

// Options passed from the query params into the script tag
const useAsync = document.currentScript.async;
const fixDvTag = useAsync && !!document.currentScript.dataset.fixdvtag;

/**
 * Simple hack to fix DV tags
 * so that they work when loaded async
 * This is where the magic happens 🧙
 *
 * Currently only enabled via URL query param: ?async=fixdvtag
 */
function patchDoubleVerifyTags() {
  const documentWrite = document.write;
  document.write = function (...args) {
    // Use asyncWrite when document.write won't work
    if (this.readyState === 'loading') {
      return documentWrite.apply(this, args);
    }
    return asyncWrite.apply(this, args);
  }
}
if (fixDvTag) {
  // Patch DV tag
  patchDoubleVerifyTags();
}

/**
 * Everyone loves ads. Let's (try to) show one!
 */
function showCreativeAd() {
  if (useAsync) {
    asyncWrite(creativeSource);
  } else {
    document.write(creativeSource);
  }
}
showCreativeAd();

/** Puts the creative code into the text box for easy verification */
function showCreativeSource() {
  const framesource = document.getElementById('adframesource');
  if (!framesource) return false;
  return framesource.innerText = creativeSource;
}
showCreativeSource() || document.addEventListener("readystatechange", showCreativeSource);

/** Like document.write, but Async-Friendly */
function asyncWrite(...args) {
  const html = args.join('');
  const divFragment = document.createRange().createContextualFragment(html);
  document.body.append(divFragment);
}


