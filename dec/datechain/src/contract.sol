// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DateChain {

    string public review;
    address public owner; // Add an owner variable

    struct Review {
        address reviewer;
        string review;
    }

    mapping(uint256 => Review) public reviews;
    uint256 public latestReviewId;

    event ReviewAdded(uint256 reviewId, address reviewer, string review);

    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    function addReview(string memory _review) public {
        require(bytes(_review).length > 0, "Review cannot be empty");

        review = _review;

        uint256 reviewId = latestReviewId + 1;
        Review storage newReview = reviews[reviewId];

        newReview.reviewer = msg.sender;
        newReview.review = _review;

        latestReviewId = reviewId;

        emit ReviewAdded(reviewId, msg.sender, _review);
    }

    function getReview() public view returns(address, string memory){
        require(latestReviewId > 0, "no review available");
        Review storage latestReview = reviews[latestReviewId];
        return (latestReview.reviewer,latestReview.review);


    }
}

// we need to write down what each line is doing line by line 