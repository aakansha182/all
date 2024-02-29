import React from 'react'
import './LegalNotice.css'

const LegalNotice = () => {
    return (
        <div className='legalnotice'>
            <h1 className='mainhead1'>Legal Notice</h1>

            <div className='legalnoticein'>
                <h2>1. Terms of Use</h2>
                <p>
                Our Terms of Service outline the rules and regulations for using our website. By accessing and using our service, you agree to be bound by these terms.
                </p>
            </div>

            <div className='legalnoticein'>
                <h2>2. Privacy Policy</h2>
                <p>
                Your privacy is important to us. Our Privacy Policy describes how we collect, use, safeguard, and disclose information that results from your use of our services.
                </p>
            </div>

            <div className='legalnoticein'>
                <h2>3. Copyright Notice</h2>
                <p>
                All content on this website, including text, graphics, logos, icons, images, and e-books, is the property of Explore and is protected by copyright and other intellectual property laws.
                </p>
            </div>

            <div className='legalnoticein'>
                <h2>4. Disclaimer</h2>
                <p>
                The information provided on this website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind.
                </p>
            </div>
        </div>
    )
}

export default LegalNotice