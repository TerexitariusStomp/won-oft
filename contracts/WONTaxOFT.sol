// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {OFT} from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFT.sol";

/// @notice WON OFT with a 1% transfer tax sent to a treasury address.
/// Tax is applied to local transfers only (mints/burns/LayerZero send/receive are exempt).
contract WONTaxOFT is OFT {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 ether; // 1,000,000 * 10^18
    uint16 public constant FEE_BPS = 100; // 1%
    uint16 public constant BPS_DENOMINATOR = 10_000;

    address public treasury;
    mapping(address => bool) public feeExempt;

    event TreasuryUpdated(address indexed newTreasury);
    event FeeExemptionUpdated(address indexed account, bool isExempt);

    constructor(
        address _endpoint,
        address _delegate,
        address _treasury,
        address _initialRecipient,
        uint256 _initialMint
    ) OFT("WON", "WON", _endpoint, _delegate) {
        require(_treasury != address(0), "treasury zero");
        treasury = _treasury;

        // Make owner/delegate and treasury exempt by default.
        feeExempt[_delegate] = true;
        feeExempt[_treasury] = true;
        feeExempt[msg.sender] = true;

        // Mint the canonical supply on one chain only.
        if (_initialMint > 0) {
            require(_initialMint <= INITIAL_SUPPLY, "mint exceeds cap");
            address recipient = _initialRecipient == address(0) ? msg.sender : _initialRecipient;
            _mint(recipient, _initialMint);
        }
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "treasury zero");
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    function setFeeExempt(address account, bool isExempt) external onlyOwner {
        feeExempt[account] = isExempt;
        emit FeeExemptionUpdated(account, isExempt);
    }

    /// @dev Applies a 1% fee on local transfers (from != 0 && to != 0) unless exempt.
    function _update(address from, address to, uint256 value) internal virtual override {
        // Skip fees on mints/burns (LayerZero send/receive calls burn/mint under the hood).
        if (from != address(0) && to != address(0) && !feeExempt[from] && !feeExempt[to]) {
            uint256 fee = (value * FEE_BPS) / BPS_DENOMINATOR;
            if (fee > 0) {
                super._update(from, treasury, fee);
                value -= fee;
            }
        }

        super._update(from, to, value);
    }
}
