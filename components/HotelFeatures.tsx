
import * as React from 'react';
import { FeatureCategory } from '../types';
import AnimatedSection from './AnimatedSection';

const FeatureIcon: React.FC<{ feature: string }> = ({ feature }) => {
    const lowerFeature = feature.toLowerCase();
    const iconClass = "w-6 h-6 text-brand-primary mr-3 flex-shrink-0";

    if (lowerFeature.includes('room') || lowerFeature.includes('accommodates') || lowerFeature.includes('bed')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    }
    if (lowerFeature.includes('view') || lowerFeature.includes('sunrise') || lowerFeature.includes('beach') || lowerFeature.includes('sea')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    }
    if (lowerFeature.includes('air-conditioned') || lowerFeature.includes('ac')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>;
    }
    if (lowerFeature.includes('pool')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945C21.405 11 22 10.405 22 9.75V9A.75.75 0 0021.25 8.25h-1.945a2 2 0 01-2-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v1a2 2 0 01-2 2H1.25A.75.75 0 00.5 9v.75c0 .655.595 1.25 1.25 1.25H3.055z" /></svg>;
    }
    if (lowerFeature.includes('restaurant') || lowerFeature.includes('dining') || lowerFeature.includes('menu') || lowerFeature.includes('bbq') || lowerFeature.includes('cuisine')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
    if (lowerFeature.includes('bar') || lowerFeature.includes('drinks')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h16M4 14v4a2 2 0 002 2h8a2 2 0 002-2v-4M8 14V4h8v10M8 4h.01M16 4h.01" /></svg>;
    }
    if (lowerFeature.includes('service') || lowerFeature.includes('transfers') || lowerFeature.includes('lobby')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    }
    if (lowerFeature.includes('wifi')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.393 8.393a15 15 0 0121.214 0" /></svg>;
    }
    if (lowerFeature.includes('parking')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>;
    }
    if (lowerFeature.includes('safari') || lowerFeature.includes('tours')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0l-6 3" /></svg>;
    }
    if (lowerFeature.includes('cycling') || lowerFeature.includes('biking')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;
    }
    if (lowerFeature.includes('snorkeling') || lowerFeature.includes('fishing') || lowerFeature.includes('water sports')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    }
     if (lowerFeature.includes('plantation') || lowerFeature.includes('garden') || lowerFeature.includes('nature') || lowerFeature.includes('eco-friendly') || lowerFeature.includes('jungle')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945C21.405 11 22 10.405 22 9.75V9A.75.75 0 0021.25 8.25h-1.945a2 2 0 01-2-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v1a2 2 0 01-2 2H1.25A.75.75 0 00.5 9v.75c0 .655.595 1.25 1.25 1.25H3.055z" /></svg>;
    }
    if (lowerFeature.includes('bird watching') || lowerFeature.includes('wildlife')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
    }
     if (lowerFeature.includes('photography')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    }
     if (lowerFeature.includes('bonfire')) {
        return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1014.12 11.88m-4.242 4.242L6 19" /></svg>;
    }
    
    // Default Icon
    return <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
};


interface HotelFeaturesProps {
  features: FeatureCategory[];
}

const HotelFeatures: React.FC<HotelFeaturesProps> = ({ features }) => {
  if (!features || features.length === 0) {
    return null;
  }
  return (
    <section>
        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8">
            What this place offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {features.map((category) => (
            <div key={category.title}>
                <h3 className="text-xl font-semibold mb-4 text-brand-dark">{category.title}</h3>
                <ul className="space-y-4">
                {category.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                    <FeatureIcon feature={item} />
                    <span className="text-gray-700 leading-snug">{item}</span>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
    </section>
  );
};
export default HotelFeatures;