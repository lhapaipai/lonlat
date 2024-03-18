#!/bin/env python


def decode_polyline(polyline_str):
    index = 0
    coordinates = []
    lat = 0
    lng = 0

    while index < len(polyline_str):
        shift = 0
        result = 0

        while True:
            byte = ord(polyline_str[index]) - 63
            index += 1
            result |= (byte & 0x1F) << shift
            shift += 5
            if byte < 0x20:
                break

        dlat = ~(result >> 1) if result & 1 else (result >> 1)
        lat += dlat

        shift = 0
        result = 0

        while True:
            byte = ord(polyline_str[index]) - 63
            index += 1
            result |= (byte & 0x1F) << shift
            shift += 5
            if byte < 0x20:
                break

        dlng = ~(result >> 1) if result & 1 else (result >> 1)
        lng += dlng

        coordinates.append((lat / 100000.0, lng / 100000.0))

    return coordinates


# Chaîne encodée fournie
encoded_polyline = "qgixGevtf@ca|ANh@uCvAcAnCGUb@\\]p@L_@N`@c@t@`A~CxBFNXPj@xAHPd@RX^AFX?HTDDRD@TFIR?OT~@q@ClA}@aANUQJYSB_@W?m@]AO?MkDb@Cc@HQ}EnCG}Ax@IkEqC?c@g@BwBoCX_@]TO[t@LcAH@SLBSF@S|@Ni@xDn@d@[lGfGEp@f@a@jGxF?TH@R?Rh@AvFbFyBzCjCfHLJl@f@NxAn@BtAvAJ|B`@Lh@jAj@\\F]?p@qL}Bb@sHnAD]BDI@DE@^E?h@EBJS?FaAFlBVJj@H^rARnAjEt@vGn@Zd@`@\\N~AtBu@LU@r@}BINWE`AkAS^k@LRg@FLa@HDg@FZ}F\\TeFQnJzArHbDj@hEQ`D^CbBc@?@M"

print(decode_polyline(encoded_polyline))
