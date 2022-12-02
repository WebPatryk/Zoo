import Link from 'next/link';
import { useRouter } from 'next/router';
import { i18n } from 'next-i18next';

export default function LocaleSwitcher() {
  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  const otherLocales = locales?.filter(
    locale => locale !== activeLocale && locale !== 'default'
  );

  const switchLangauge = () => {
    console.log('e')
    router.push('/', '/', { 'pl'});
    // i18n?.changeLanguage('ar');
  };

  return (
    //       <span key={'locale-' + locale}>
    //         <Link href={{ pathname, query }} as={asPath} locale={locale}>
    //           <a>
    //             {locale === 'en' ? 'English' : locale === 'ar' ? 'عربى' : null}
    //           </a>
    //         </Link>
    //       </span>
    //     );
    //   })}
    // </span>
    <>
      <button onClick={switchLangauge}>Switch Language</button>
    </>
  );
}
