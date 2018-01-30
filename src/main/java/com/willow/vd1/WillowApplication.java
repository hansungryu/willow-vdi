package com.willow.vd1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import java.util.Locale;
/*import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;*/

//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
@SpringBootApplication
public class WillowApplication {

	private static final Logger logger = LoggerFactory.getLogger(WillowApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(WillowApplication.class, args);

		logger.error("Message logged at ERROR level");
		logger.warn("Message logged at WARN level");
		logger.info("Message logged at INFO level");
		logger.debug("Message logged at DEBUG level");
	}

    @Bean(name = "localeResolver")
    public CookieLocaleResolver localeResolver() {
        CookieLocaleResolver localeResolver = new CookieLocaleResolver();
        //Locale defaultLocale = new Locale("ko", "KR");
		Locale defaultLocale = Locale.US;
        localeResolver.setDefaultLocale(defaultLocale);
        localeResolver.setCookieName("wwwLocale");
        localeResolver.setCookieMaxAge(60*60);
        return localeResolver;
    }

	@Bean
	public WebMvcConfigurer configurer () {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addInterceptors (InterceptorRegistry registry) {
				LocaleChangeInterceptor l = new LocaleChangeInterceptor();
				l.setParamName("locale");
				registry.addInterceptor(l);
			}
		};
	}

    @Bean
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:messages");
		messageSource.setDefaultEncoding("UTF-8");
        messageSource.setCacheSeconds(10); //reload messages every 10 seconds
        return messageSource;
    }
}
