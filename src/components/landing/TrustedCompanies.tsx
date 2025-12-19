export default function TrustedCompanies() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-gray-900">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Diebold Nixdorf"
            src="https://oceanbluecorp.com/storage/images/1717579106.png"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Ohio Department of Transportation"
            src="https://development.ohio.gov/wps/wcm/connect/gov/7efff5ea-f9fd-4c0f-9a71-401183103f50/development-logo.png?MOD=AJPERES"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Condado Tacos"
            src="/crave.webp"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 bg-gree"
          />
          <img
            alt="City Barbecue"
            src="https://oceanbluecorp.com/storage/images/1717579353.png"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
          />
          <img
            alt="Satya Wholesale"
            src="https://oceanbluecorp.com/storage/images/1719296477.png"
            width={160}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
      </div>
    </div>
  )
}
