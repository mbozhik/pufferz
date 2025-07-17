import NextScript from 'next/script'

export function Analytics() {
  const counterId = '103368892'

  return (
    <NextScript
      id="yandex_metrika"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for(j=0;j<document.scripts.length;j++){
                    if(document.scripts[j].src===r)return
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window,document,'script','https://mc.webvisor.org/metrika/tag_ww.js','ym');

                ym(${counterId},'init',{
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `,
      }}
    />
  )
}
