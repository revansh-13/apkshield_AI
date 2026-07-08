# Extract certificate information from an Android APK and return
# a standardized parser report.


def _create_name_record(
    *,
    common_name: str | None,
    organization: str | None,
    country: str | None,
) -> dict:
    """
    Create a standardized certificate name record.
    """
    return {
        "common_name": common_name,
        "organization": organization,
        "country": country,
    }


#--------------------------------------------------------#

def _create_certificate_record(certificate) -> dict:
    """
    Create a standardized certificate record.
    """
    subject = certificate.subject.native
    issuer = certificate.issuer.native

    return {
        "subject": _create_name_record(
            common_name=subject.get("common_name"),
            organization=subject.get("organization_name"),
            country=subject.get("country_name"),
        ),
        "issuer": _create_name_record(
            common_name=issuer.get("common_name"),
            organization=issuer.get("organization_name"),
            country=issuer.get("country_name"),
        ),
        "serial_number": certificate.serial_number,
        "signature_algorithm": certificate.signature_algo,
        "hash_algorithm": certificate.hash_algo,
        "valid_from": certificate.not_valid_before,
        "valid_to": certificate.not_valid_after,
        "sha256_fingerprint": certificate.sha256_fingerprint,
    }

#--------------------------------------------------------#

def _extract_certificates(apk)-> list:
    """
    Extract certificate information from the APK object.
    """
    certificates = apk.get_certificates()

    return list(apk.get_certificates())

#--------------------------------------------------------#

def _create_certificate_collection(certificates: list) -> dict:
    """
    Create a standardized certificate collection.
    """
    certificate_records = [
        _create_certificate_record(certificate)
        for certificate in certificates
    ]

    return {
        "certificates": certificate_records,
        "certificate_count": len(certificate_records),
    }

#--------------------------------------------------------#

def parse_certificates(apk) -> dict:
    """
    Parse certificate information from the APK.
    """
    certificates = _extract_certificates(apk)

    return _create_certificate_collection(certificates)